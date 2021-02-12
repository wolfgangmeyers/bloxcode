resource "aws_iam_role" "broker_access" {
  name = "broker_broker_access"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "broker_logs" {
  role       = aws_iam_role.broker_access.name
  policy_arn = aws_iam_policy.lambda_logs_access.arn
}


resource "aws_iam_policy" "broker_dynamo_access" {
  name        = "broker_broker_dynamo_access"
  description = "IAM policy for DynamoDB access to broker lambda"
  policy      = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "dynamodb:*"
            ],
            "Resource": [

        "${aws_dynamodb_table.queues.arn}",
        "${aws_dynamodb_table.queues.arn}/*",


        "${aws_dynamodb_table.messages.arn}",
        "${aws_dynamodb_table.messages.arn}/*",


        "${aws_dynamodb_table.codes.arn}",
        "${aws_dynamodb_table.codes.arn}/*"

            ],
            "Effect": "Allow"
        }
    ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "broker_dynamo_access" {
  role       = aws_iam_role.broker_access.name
  policy_arn = aws_iam_policy.broker_dynamo_access.arn
}


resource "aws_lambda_function" "broker" {
  filename         = "/tmp/server.zip"
  function_name    = "broker_backend"
  role             = aws_iam_role.broker_access.arn
  handler          = "server"
  source_code_hash = filebase64sha256("/tmp/server.zip")
  runtime          = "go1.x"
}

resource "aws_iam_policy" "lambda_logs_access" {
  name        = "broker_usermigration_access"
  description = "IAM policy for logging from lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:CreateLogGroup"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}
