resource "aws_dynamodb_table" "codes" {
  name = "broker_codes"
  attribute {
    name = "code"
    type = "S"
  }

  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }
  hash_key       = "code"
  read_capacity  = 1
  write_capacity = 1
  lifecycle {
    ignore_changes = [read_capacity, write_capacity]
  }
}

