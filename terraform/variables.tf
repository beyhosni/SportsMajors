variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "sportsmajors"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "az_count" {
  description = "Number of Availability Zones to use"
  type        = number
  default     = 2
}

variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "sportsmajors"
}

variable "db_username" {
  description = "Username for the database"
  type        = string
  default     = "dbadmin"
}

variable "db_password" {
  description = "Password for the database"
  type        = string
  sensitive   = true
}
