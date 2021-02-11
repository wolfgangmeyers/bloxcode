
resource "aws_api_gateway_rest_api" "broker_api" {
  name        = "broker_broker_api"
  description = "broker REST API"
}

resource "aws_api_gateway_resource" "broker_proxy" {
  rest_api_id = aws_api_gateway_rest_api.broker_api.id
  parent_id   = aws_api_gateway_rest_api.broker_api.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "broker_proxy" {
  rest_api_id   = aws_api_gateway_rest_api.broker_api.id
  resource_id   = aws_api_gateway_resource.broker_proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "broker_lambda" {
  rest_api_id = aws_api_gateway_rest_api.broker_api.id
  resource_id = aws_api_gateway_method.broker_proxy.resource_id
  http_method = aws_api_gateway_method.broker_proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.broker.invoke_arn
}

resource "aws_api_gateway_method" "broker_proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.broker_api.id
  resource_id   = aws_api_gateway_rest_api.broker_api.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "broker_lambda_root" {
  rest_api_id = aws_api_gateway_rest_api.broker_api.id
  resource_id = aws_api_gateway_method.broker_proxy_root.resource_id
  http_method = aws_api_gateway_method.broker_proxy_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.broker.invoke_arn
}

resource "aws_api_gateway_deployment" "broker_deployment" {
  depends_on = [
    aws_api_gateway_integration.broker_lambda,
    aws_api_gateway_integration.broker_lambda_root,
  ]

  rest_api_id = aws_api_gateway_rest_api.broker_api.id
  stage_name  = "prod"
}

resource "aws_lambda_permission" "broker_apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.broker.arn
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_deployment.broker_deployment.execution_arn}/*/*"
}

output "broker_api_url" {
  value = aws_api_gateway_deployment.broker_deployment.invoke_url
}
