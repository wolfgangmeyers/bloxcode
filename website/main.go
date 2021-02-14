package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// push to and fetch from queues
	r := gin.New()
	r.Static("/", "./static")
	http.ListenAndServe(":9080", r)
}
