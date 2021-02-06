package main

import (
	"container/list"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Message is a message that can be passed back and forth by queues
type Message struct {
	EventType string                 `json:"event_type"`
	EventData map[string]interface{} `json:"event_data"`
}

var queues = map[string]*list.List{}

// PushToQueue pushes a message onto a queue
func PushToQueue(queueName string, message *Message) {
	queue, exists := queues[queueName]
	if !exists {
		queue = list.New()
		queues[queueName] = queue
	}
	queue.PushBack(message)
}

// PullFromQueue pulls messages from a queue
func PullFromQueue(queueName string) []*Message {
	queue, exists := queues[queueName]
	if !exists || queue.Len() == 0 {
		return []*Message{}
	}
	result := make([]*Message, 0, queue.Len())
	for queue.Len() > 0 {
		e := queue.Front()
		result = append(result, e.Value.(*Message))
		queue.Remove(e)
	}
	return result
}

func main() {
	// push to and fetch from queues
	r := gin.New()
	r.POST("/messages/:queue", func(ctx *gin.Context) {
		queueName := ctx.Param("queue")
		var message Message
		if err := ctx.BindJSON(&message); err != nil {
			ctx.AbortWithError(http.StatusBadRequest, err)
			return
		}
		log.Println("Pushing message to queue")
		PushToQueue(queueName, &message)
	})
	r.GET("/messages/:queue", func(ctx *gin.Context) {
		queueName := ctx.Param("queue")
		messages := PullFromQueue(queueName)
		if len(messages) > 0 {
			log.Printf("Returning %v messages", len(messages))
		}
		ctx.JSON(http.StatusOK, map[string]interface{}{
			"messages": messages,
		})
	})
	r.Static("/ui", "./static")
	r.Static("/media", "./media")
	http.ListenAndServe(":9080", r)
}
