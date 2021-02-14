package broker

import (
	"log"
	"math/rand"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var codePattern = regexp.MustCompile("[A-Z0-9]{6}")

var codeDigits = []byte("ABCDEFGHIJKLMNPQRSTUVWXYZ123456789")

func isUUID(item string) bool {
	_, err := uuid.Parse(item)
	return err == nil
}

func randomCode() string {
	code := make([]byte, 6)
	for i := 0; i < len(code); i++ {
		digit := codeDigits[rand.Intn(len(codeDigits))]
		code[i] = digit
	}
	return string(code)
}

func ConfigureRoutes() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"}, // TODO: limit to https://www.roblox.studio
		AllowMethods: []string{"POST", "GET", "PUT"},
		AllowHeaders: []string{"*"},
	}))

	r.POST("/codes", createCodeHandler)
	r.PUT("/codes/:code", renewCodeHandler)
	r.GET("/codes/:code", getCodeHandler)
	r.POST("/messages/:queue", queueAuthorizationMiddleware(http.StatusNoContent, nil), postMessageHandler)
	r.GET("/messages/:queue", queueAuthorizationMiddleware(http.StatusOK, map[string]interface{}{
		"messages": []Message{},
	}), getMessagesHandler)
	return r
}

func getCodeHandler(c *gin.Context) {
	code := strings.ToUpper(c.Param("code"))
	if !codePattern.MatchString(code) {
		log.Printf("Invalid code: %v", code)
		c.Status(http.StatusNotFound)
		return
	}
	codeItem, err := GetCode(code)
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
			c.Abort()
			return
		}
		item, err := GetQueue(queue)
		if err != nil {
			log.Printf("Error getting queue %v for authorization: %v", queue, err.Error())
			returnDefaultResult(c)
			c.Abort()
			return
		}
		if item == nil {
			log.Printf("Authorization failed, queue %v not found", queue)
			returnDefaultResult(c)
			c.Abort()
			return
		}
		authCode := c.GetHeader("authcode")
		if item.AuthCode != authCode {
			log.Printf("Authorization failed, authcode mismatch. Expected %v, received %v", item.AuthCode, authCode)
			returnDefaultResult(c)
			c.Abort()
			return
		}
		// authorization succeeded
		c.Next()
	}
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
	if err := SaveMessage(message); err != nil {
		log.Println(err.Error())
		c.Status(http.StatusInternalServerError)
		return
	}
	if err := RenewQueue(queue); err != nil {
		log.Println(err.Error())
		c.Status(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusNoContent)
}

func getMessagesHandler(c *gin.Context) {
	queue := c.Param("queue")
	messages, err := ListMessages(queue)
	for _, message := range messages {
		message.ExpiresAt = 0
		if err := DeleteMessage(message.ID); err != nil {
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
	if err := RenewQueue(queue); err != nil {
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
	if err := SaveCode(code); err != nil {
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
		if err := SaveQueue(queueItem); err != nil {
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

func renewCodeHandler(c *gin.Context) {
	code := strings.ToUpper(c.Param("code"))
	if codePattern.MatchString(code) {
		item, err := GetCode(code)
		if err != nil {
			log.Println(err.Error())
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		if item != nil {
			item.ExpiresAt = time.Now().Unix() + 10
			if err := SaveCode(item); err != nil {
				log.Println(err.Error())
				c.AbortWithStatus(http.StatusInternalServerError)
				return
			}
			// renew queues
			for _, queueID := range item.Queues {
				queue, err := GetQueue(queueID)
				if err != nil {
					log.Println(err.Error())
					c.AbortWithStatus(http.StatusInternalServerError)
					return
				}
				if queue != nil {
					queue.ExpiresAt = time.Now().Unix() + 60
					if err := SaveQueue(queue); err != nil {
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
