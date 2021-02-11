package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var ginLambda *ginadapter.GinLambda

var codePattern = regexp.MustCompile("[A-Z0-9]{6}")

var queuesTable = os.Getenv("queuesTable")
var messagesTable = os.Getenv("messagesTable")
var codesTable = os.Getenv("codesTable")

var dynamoClient = dynamodb.New(session.Must(session.NewSession()))

var codeDigits = []byte("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

func randomCode() string {
	code := make([]byte, 6)
	for i := 0; i < len(code); i++ {
		digit := codeDigits[rand.Intn(len(codeDigits))]
		code[i] = digit
	}
	return string(code)
}

func init() {

	log.Println("Cold start")

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"POST"},
		AllowHeaders: []string{"*"},
	}))

	r.POST("/codes", createCodeHandler)
	r.PUT("/codes/:code", renewCodeHandler)
	// TODO: get code handler
	r.POST("/messages/:queue", postMessageHandler)
	r.GET("/messages/:queue", getMessagesHandler)
	ginLambda = ginadapter.New(r)
}

func postMessageHandler(c *gin.Context) {
	// TODO: post if authorized and valid
	// TODO: renew queue
	c.Status(http.StatusNoContent)
}

func getMessagesHandler(c *gin.Context) {
	messages := []Message{}
	// TODO: look up if authorized and valid
	// TODO: omit expiration of messages outbound
	// TODO: renew queue
	c.JSON(http.StatusOK, map[string]interface{}{
		"messages": messages,
	})
}

func createCodeHandler(c *gin.Context) {
	var input CreateCodeInput
	if err := c.BindJSON(&input); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	if len(input.QueueNames) > 2 {
		log.Printf("Attempt to create %v queues", len(input.QueueNames))
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	queues := map[string]string{}
	for _, queueName := range input.QueueNames {
		queues[queueName] = uuid.NewString()
	}

	code := &Code{
		Code:      randomCode(),
		Queues:    queues,
		Authcode:  uuid.NewString(),
		ExpiresAt: time.Now().Unix() + 10,
	}
	if err := saveCode(code); err != nil {
		log.Println(err.Error())
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	for _, queue := range queues {
		queueItem := &Queue{
			ID:        queue,
			AuthCode:  code.Authcode,
			ExpiresAt: time.Now().Unix() + 60,
		}
		if err := saveQueue(queueItem); err != nil {
			log.Println(err.Error())
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
	}
	// omit expiration from api
	code.ExpiresAt = 0

	c.JSON(http.StatusOK, code)

	return
}

func deleteQueue(queue string) error {
	_, err := dynamoClient.DeleteItem(&dynamodb.DeleteItemInput{
		TableName: aws.String(queuesTable),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(queue),
			},
		},
	})
	return err
}

func getQueue(queue string) (*Queue, error) {
	resp, err := dynamoClient.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(queuesTable),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(queue),
			},
		},
		ConsistentRead: aws.Bool(true),
	})
	if err != nil {
		return nil, fmt.Errorf("Error getting queue '%v': %v", queue, err.Error())
	}
	var item Queue
	if err = dynamodbattribute.UnmarshalMap(resp.Item, &item); err != nil {
		return nil, fmt.Errorf("Error unmarshaling queue '%v': %v", queue, err.Error())
	}
	if len(item.ID) > 0 {
		// Delete queue if expired and return nil
		if item.ExpiresAt <= time.Now().Unix() {
			if err := deleteQueue(queue); err != nil {
				return nil, err
			}
			return nil, nil
		}
		return &item, nil
	}
	return nil, nil
}

func saveQueue(queue *Queue) error {
	attr, err := dynamodbattribute.MarshalMap(queue)
	if err != nil {
		return fmt.Errorf("Error converting from queue to dynamodb: %v", err.Error())
	}
	_, err = dynamoClient.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String(queuesTable),
		Item:      attr,
	})
	if err != nil {
		return fmt.Errorf("Error saving queue to dynamodb: %v", err.Error())
	}
	return nil
}

func saveCode(code *Code) error {
	attr, err := dynamodbattribute.MarshalMap(code)
	if err != nil {
		return fmt.Errorf("Error converting from code to dynamodb: %v", err.Error())
	}
	_, err = dynamoClient.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String(codesTable),
		Item:      attr,
	})
	if err != nil {
		return fmt.Errorf("Error saving code to dynamodb: %v", err.Error())
	}
	return nil
}

func deleteCode(code string) error {
	_, err := dynamoClient.DeleteItem(&dynamodb.DeleteItemInput{
		TableName: aws.String(codesTable),
		Key: map[string]*dynamodb.AttributeValue{
			"code": {
				S: aws.String(code),
			},
		},
	})
	return err
}

func getCode(code string) (*Code, error) {
	resp, err := dynamoClient.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(codesTable),
		Key: map[string]*dynamodb.AttributeValue{
			"code": {
				S: aws.String(code),
			},
		},
		ConsistentRead: aws.Bool(true),
	})
	if err != nil {
		return nil, fmt.Errorf("Error getting code '%v': %v", code, err.Error())
	}
	var item Code
	if err = dynamodbattribute.UnmarshalMap(resp.Item, &item); err != nil {
		return nil, fmt.Errorf("Error unmarshaling code '%v': %v", code, err.Error())
	}
	if len(item.Code) == 6 {
		// Delete item if expired and return nil
		if item.ExpiresAt <= time.Now().Unix() {
			if err := deleteCode(code); err != nil {
				return nil, fmt.Errorf("Error deleting code '%v': %v", code, err.Error())
			}
			return nil, nil
		}
		return &item, nil
	}
	return nil, nil
}

func renewCodeHandler(c *gin.Context) {
	code := strings.ToUpper(c.Param("code"))
	if codePattern.MatchString(code) {
		item, err := getCode(code)
		if err != nil {
			log.Println(err.Error())
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		if item != nil {
			item.ExpiresAt = time.Now().Unix() + 10
			if err := saveCode(item); err != nil {
				log.Println(err.Error())
				c.AbortWithStatus(http.StatusInternalServerError)
				return
			}
			// renew queues
			for _, queueID := range item.Queues {
				queue, err := getQueue(queueID)
				if err != nil {
					log.Println(err.Error())
					c.AbortWithStatus(http.StatusInternalServerError)
					return
				}
				if queue != nil {
					queue.ExpiresAt = time.Now().Unix() + 60
					if err := saveQueue(queue); err != nil {
						log.Println(err.Error())
						c.AbortWithStatus(http.StatusInternalServerError)
						return
					}
				}
			}
		}
	}
	c.Status(http.StatusNoContent)
}

// Handler routes api gateway requests to our Gin router
func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.Proxy(req)
}

func main() {
	lambda.Start(Handler)
}
