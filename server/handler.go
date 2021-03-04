package main

import (
	"context"
	"log"
	"math/rand"
	"server/broker"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
)

var ginLambda *ginadapter.GinLambda

func init() {

	log.Println("Cold start")
	rand.Seed(time.Now().UnixNano())

	ginLambda = ginadapter.New(broker.ConfigureRoutes())
}

// Handler routes api gateway requests to our Gin router
func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.Proxy(req)
}

func main() {
	lambda.Start(Handler)
}
