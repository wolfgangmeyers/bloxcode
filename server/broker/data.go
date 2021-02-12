package broker

import (
	"fmt"
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

var queuesTable = "broker_queues"     //os.Getenv("queuesTable")
var messagesTable = "broker_messages" // os.Getenv("messagesTable")
var codesTable = "broker_codes"       // os.Getenv("codesTable")

func getDynamoClient() *dynamodb.DynamoDB {
	cfg := &aws.Config{
		Region: aws.String("us-west-2"),
	}
	if os.Getenv("CLOUD") != "true" {
		cfg.DisableSSL = aws.Bool(true)
		cfg.Endpoint = aws.String("http://localhost:4566")
	}
	return dynamodb.New(session.Must(session.NewSession()), cfg)
}

var dynamoClient = getDynamoClient()

func SaveMessage(message *Message) error {
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

func RenewQueue(queue string) error {
	queueItem, err := GetQueue(queue)
	if err != nil {
		return fmt.Errorf("Error getting queue: %v", err.Error())
	}
	if queueItem != nil {
		queueItem.ExpiresAt = time.Now().Unix() + 60
		if err = SaveQueue(queueItem); err != nil {
			return fmt.Errorf("Error renewing queue: %v", err.Error())
		}
	}
	return nil
}

func ListMessages(queue string) ([]*Message, error) {
	resp, err := dynamoClient.Query(&dynamodb.QueryInput{
		TableName:              aws.String(messagesTable),
		KeyConditionExpression: aws.String("queue = :queue"),
		IndexName:              aws.String("ByQueue"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":queue": {
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

func DeleteMessage(id string) error {
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

func DeleteQueue(queue string) error {
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

func GetQueue(queue string) (*Queue, error) {
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
			if err := DeleteQueue(queue); err != nil {
				return nil, err
			}
			return nil, nil
		}
		return &item, nil
	}
	return nil, nil
}

func SaveQueue(queue *Queue) error {
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

func SaveCode(code *Code) error {
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

func DeleteCode(code string) error {
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

func GetCode(code string) (*Code, error) {
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
			if err := DeleteCode(code); err != nil {
				return nil, fmt.Errorf("Error deleting code '%v': %v", code, err.Error())
			}
			return nil, nil
		}
		return &item, nil
	}
	return nil, nil
}
