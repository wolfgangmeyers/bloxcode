package broker

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

type Helper struct {
	endpoint   string
	httpServer *http.Server
}

func (h *Helper) url(path string) string {
	return fmt.Sprintf("%v%v", h.endpoint, path)
}

func (h *Helper) GetCode(code string) (*http.Response, error) {
	return http.Get(h.url(fmt.Sprintf("/codes/%v", code)))
}

func (h *Helper) ReadResponse(resp *http.Response, out interface{}) error {
	defer resp.Body.Close()
	return json.NewDecoder(resp.Body).Decode(out)
}

func (h *Helper) ReadMessages(resp *http.Response) ([]*Message, error) {
	var result MessageResponse
	if err := h.ReadResponse(resp, &result); err != nil {
		return nil, err
	}
	return result.Messages, nil
}

func (h *Helper) PostMessage(queue string, authcode string, message *Message) (*http.Response, error) {
	data, err := json.Marshal(message)
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequest(http.MethodPost, h.url(fmt.Sprintf("/messages/%v", queue)), bytes.NewReader(data))
	if err != nil {
		return nil, err
	}
	req.Header.Add("authcode", authcode)
	resp, err := http.DefaultClient.Do(req)
	return resp, err
}

func (h *Helper) GetMessages(queue string, authcode string) (*http.Response, error) {
	req, err := http.NewRequest(http.MethodGet, h.url(fmt.Sprintf("/messages/%v", queue)), nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("authcode", authcode)
	resp, err := http.DefaultClient.Do(req)
	return resp, err
}

func (h *Helper) CreateCode(queueNames []string) (*http.Response, error) {
	data, err := json.Marshal(&CreateCodeInput{
		QueueNames: queueNames,
	})
	if err != nil {
		return nil, err
	}
	resp, err := http.Post(h.url("/codes"), "application/json", bytes.NewReader(data))
	return resp, err
}

func (h *Helper) StartServer(port int) {
	r := ConfigureRoutes()
	h.httpServer = &http.Server{
		Addr:    fmt.Sprintf(":%v", port),
		Handler: r,
	}
	go h.httpServer.ListenAndServe()
}

func (h *Helper) StopServer() {
	h.httpServer.Shutdown(context.Background())
}

func TestServer(tMain *testing.T) {
	h := &Helper{
		endpoint: "http://localhost:8000",
	}
	h.StartServer(8000)
	tMain.Run("Code not found", func(t *testing.T) {
		resp, err := h.GetCode("abc123")
		require.NoError(t, err)
		require.Equal(t, http.StatusNotFound, resp.StatusCode)
	})
	tMain.Run("Too many queues", func(t *testing.T) {
		resp, err := h.CreateCode([]string{"foo", "bar", "bazz"})
		require.NoError(t, err)
		require.Equal(t, http.StatusBadRequest, resp.StatusCode)
	})
	// Post to and read from nonexistent queue
	tMain.Run("Post to nonexistent queue", func(t *testing.T) {
		// post a message
		sentMessage := &Message{
			EventType: "foobar",
		}
		nonexistentQueue := uuid.NewString()
		authCode := uuid.NewString()
		resp, err := h.PostMessage(nonexistentQueue, authCode, sentMessage)
		require.NoError(t, err)
		require.Equal(t, http.StatusNoContent, resp.StatusCode)
		time.Sleep(time.Second)

		resp, err = h.GetMessages(nonexistentQueue, authCode)
		require.NoError(t, err)
		require.Equal(t, http.StatusOK, resp.StatusCode)
		messages, err := h.ReadMessages(resp)
		require.NoError(t, err)
		require.Equal(t, 0, len(messages))
	})

	tMain.Run("Message workflow", func(t *testing.T) {
		resp, err := h.CreateCode([]string{"foo", "bar"})
		require.NoError(t, err)
		require.Equal(t, http.StatusOK, resp.StatusCode)
		var code Code
		require.NoError(t, h.ReadResponse(resp, &code))
		require.NotEmpty(t, code.Code)
		require.NotEmpty(t, code.Authcode)
		require.Equal(t, 2, len(code.Queues))

		// post a message
		sentMessage := &Message{
			EventType: "foobar",
		}
		resp, err = h.PostMessage(code.Queues["foo"], code.Authcode, sentMessage)
		require.NoError(t, err)
		require.Equal(t, http.StatusNoContent, resp.StatusCode)
		time.Sleep(time.Second)

		resp, err = h.GetMessages(code.Queues["foo"], code.Authcode)
		require.NoError(t, err)
		require.Equal(t, http.StatusOK, resp.StatusCode)
		messages, err := h.ReadMessages(resp)
		require.NoError(t, err)
		require.Equal(t, 1, len(messages))
		require.Equal(t, "foobar", messages[0].EventType)

		// repeat without authcode
		fakeAuthCode := uuid.NewString()
		resp, err = h.PostMessage(code.Queues["foo"], fakeAuthCode, sentMessage)
		require.NoError(t, err)
		require.Equal(t, http.StatusNoContent, resp.StatusCode)
		time.Sleep(time.Second)

		resp, err = h.GetMessages(code.Queues["foo"], fakeAuthCode)
		require.NoError(t, err)
		require.Equal(t, http.StatusOK, resp.StatusCode)
		messages, err = h.ReadMessages(resp)
		require.NoError(t, err)
		require.Equal(t, 0, len(messages))
	})
	h.StopServer()
}
