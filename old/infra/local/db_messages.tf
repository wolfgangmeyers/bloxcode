resource "aws_dynamodb_table" "messages" {
  name = "broker_messages"
  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "queue"
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
  global_secondary_index {
    name     = "ByQueue"
    hash_key = "queue"

    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }

}

