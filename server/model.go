package main

// CreateCodeInput is the input to create a new set of queues
type CreateCodeInput struct {
	QueueNames []string `json:"queueNames"`
}

// Code is an invite code
type Code struct {
	Code      string            `json:"code"`
	Queues    map[string]string `json:"queues"`
	Authcode  string            `json:"auth_code"`
	ExpiresAt int64             `json:"expires_at,omitempty"`
}

// Queue represents an active queue
type Queue struct {
	ID        string `json:"id"`
	AuthCode  string `json:"auth_code"`
	ExpiresAt int64  `json:"expires_at,omitempty"`
}

// Message is a message in a queue
type Message struct {
	ID        string                 `json:"id"`
	Queue     string                 `json:"queue,omitempty"`
	EventType string                 `json:"event_type"`
	EventData map[string]interface{} `json:"event_data"`
	ExpiresAt int64                  `json:"expires_at,omitempty"`
}
