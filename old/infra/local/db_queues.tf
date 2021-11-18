resource "aws_dynamodb_table" "queues" {
  name = "broker_queues"
  attribute {
    name = "id"
    type = "S"
  }

  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }
  hash_key       = "id"
  read_capacity  = 1
  write_capacity = 1
  lifecycle {
    ignore_changes = [read_capacity, write_capacity]
  }

}
