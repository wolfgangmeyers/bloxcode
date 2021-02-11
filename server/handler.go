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
	r.GET("/codes/:code", getCodeHandler)
	r.POST("/messages/:queue", queueAuthorizationMiddleware(http.StatusNoContent, nil), postMessageHandler)
	r.GET("/messages/:queue", queueAuthorizationMiddleware(http.StatusOK, map[string]interface{}{
		"messages": []Message{},
	}), getMessagesHandler)
	ginLambda = ginadapter.New(r)
}

func isUUID(item string) bool {
	_, err := uuid.Parse(item)
	return err == nil
}

func getCodeHandler(c *gin.Context) {
	code := c.Param("code")
	if !codePattern.MatchString(code) {
		log.Printf("Invalid code: %v", code)
		c.Status(http.StatusNotFound)
		return
	}
	codeItem, err := getCode(code)
	if err != nil {
		log.Printf("Error getting code %v: %v", code, err.Error())
		c.Status(http.StatusNotFound)
		return
	}
	if codeItem == nil {
		log.Printf("Code %v not found", code)
		c.Status(http.StatusNotFound)
		return
	}
	c.JSON(http.StatusOK, codeItem)
}

func queueAuthorizationMiddleware(defaultStatus int, defaultResponse interface{}) func(c *gin.Context) {

	var returnDefaultResult = func(c *gin.Context) {
		if defaultResponse != nil {
			c.JSON(defaultStatus, defaultResponse)
		} else {
			c.Status(defaultStatus)
		}
	}

	return func(c *gin.Context) {
		queue := c.Param("queue")
		if !isUUID(queue) {
			log.Printf("Not a valid queue id: %v", queue)
			returnDefaultResult(c)
			return
		}
		item, err := getQueue(queue)
		if err != nil {
			log.Printf("Error getting queue %v for authorization: %v", queue, err.Error())
			returnDefaultResult(c)
			return
		}
		if item == nil {
			log.Printf("Authorization failed, queue %v not found", queue)
			returnDefaultResult(c)
			return
		}
		authCode := c.GetHeader("authcode")
		if item.AuthCode != authCode {
			log.Printf("Authorization failed, authcode mismatch. Expected %v, received %v", item.AuthCode, authCode)
			returnDefaultResult(c)
			return
		}
		// authorization succeeded
		c.Next()
	}
}

func saveMessage(message *Message) error {
	av, err := dynamodbattribute.MarshalMap(message)
	if err != nil {
		return fmt.Errorf("Error marshalling message: %v", err.Error())
	}
	_, err = dynamoClient.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String(messagesTable),
		Item:      av,
	})
	if err != nil {
		return fmt.Errorf("Error saving message: %v", err.Error())
	}
	return nil
}

func postMessageHandler(c *gin.Context) {
	queue := c.Param("queue")
	var input CreateMessageInput
	if err := c.BindJSON(&input); err != nil || len(input.EventType) == 0 {
		log.Printf("Error parsing message post: %v", err.Error())
		c.Status(http.StatusBadRequest)
		return
	}
	message := &Message{
		ID:        uuid.NewString(),
		Queue:     queue,
		EventType: input.EventType,
		EventData: input.EventData,
		ExpiresAt: time.Now().Unix() + 60,
	}
	if err := saveMessage(message); err != nil {
		log.Println(err.Error())
		c.Status(http.StatusInternalServerError)
		return
	}
	if err := renewQueue(queue); err != nil {
		log.Println(err.Error())
		c.Status(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusNoContent)
}

func renewQueue(queue string) error {
	queueItem, err := getQueue(queue)
	if err != nil {
		return fmt.Errorf("Error getting queue: %v", err.Error())
	}
	if queueItem != nil {
		queueItem.ExpiresAt = time.Now().Unix() + 60
		if err = saveQueue(queueItem); err != nil {
			return fmt.Errorf("Error renewing queue: %v", err.Error())
		}
	}
	return nil
}

func listMessages(queue string) ([]*Message, error) {
	resp, err := dynamoClient.Query(&dynamodb.QueryInput{
		TableName:              aws.String(messagesTable),
		KeyConditionExpression: aws.String("queue = :queue"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			"queue": {
				S: aws.String(queue),
			},
		},
	})
	if err != nil {
		return nil, fmt.Errorf("Error listing messages: %v", err.Error())
	}
	result := make([]*Message, len(resp.Items))
	for i := 0; i < len(result); i++ {
		message := &Message{}
		if err = dynamodbattribute.UnmarshalMap(resp.Items[i], message); err != nil {
			return nil, fmt.Errorf("Error unmarshaling message: %v", err.Error())
		}
		result[i] = message
	}
	return result, nil
}

func deleteMessage(id string) error {
	_, err := dynamoClient.DeleteItem(&dynamodb.DeleteItemInput{
		TableName: aws.String(messagesTable),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(id),
			},
		},
	})
	if err != nil {
		return fmt.Errorf("Error deleting message: %v", err.Error())
	}
	return nil
}

func getMessagesHandler(c *gin.Context) {
	queue := c.Param("queue")
	messages, err := listMessages(queue)
	for _, message := range messages {
		message.ExpiresAt = 0
		if err := deleteMessage(message.ID); err != nil {
			log.Println(err.Error())
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
	}
	if err != nil {
		log.Println(err.Error())
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	if err := renewQueue(queue); err != nil {
		log.Println(err.Error())
		c.Status(http.StatusInternalServerError)
		return
	}
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
