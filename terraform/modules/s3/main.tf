resource "aws_s3_bucket" "docs" {
  bucket = "${var.project_name}-docs-${random_id.bucket_suffix.hex}"

  tags = {
    Name = "${var.project_name}-docs"
  }
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

resource "aws_s3_bucket_public_access_block" "docs" {
  bucket = aws_s3_bucket.docs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
