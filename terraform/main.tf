terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = "SportsMajors"
      ManagedBy = "Terraform"
    }
  }
}

module "vpc" {
  source = "./modules/vpc"

  project_name = var.project_name
  vpc_cidr     = var.vpc_cidr
  az_count     = var.az_count
}

module "s3" {
  source = "./modules/s3"

  project_name = var.project_name
}

module "rds" {
  source = "./modules/rds"

  project_name      = var.project_name
  vpc_id            = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  db_name           = var.db_name
  db_username       = var.db_username
  db_password       = var.db_password
}

module "ecs" {
  source = "./modules/ecs"

  project_name      = var.project_name
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids  = module.vpc.public_subnet_ids
  private_subnet_ids = module.vpc.private_subnet_ids
  s3_bucket_arn     = module.s3.bucket_arn
  db_host           = module.rds.db_host
}
