terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.50"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  backend "s3" {
    bucket         = "mesrai-demo-tfstate-dev"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "mesrai-demo-tfstate-lock"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.common_tags
  }
}

locals {
  name        = "mesrai-demo"
  environment = "dev"

  common_tags = {
    Project     = "mesrai-demo"
    Environment = local.environment
    ManagedBy   = "terraform"
    Repository  = "mesrai-demo-repo"
  }
}

################################################################################
# VPC
################################################################################
module "vpc" {
  source = "../../modules/vpc"

  name               = "${local.name}-${local.environment}"
  vpc_cidr           = var.vpc_cidr
  availability_zones = var.availability_zones
  enable_nat_gateway = true

  tags = local.common_tags
}

################################################################################
# RDS — Aurora Serverless PostgreSQL
################################################################################
module "rds" {
  source = "../../modules/rds"

  name               = "${local.name}-${local.environment}"
  environment        = local.environment
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids

  allowed_security_group_ids = []  # ECS SG added after ECS module
  database_name              = "mesrai_demo"
  master_username            = "dbadmin"

  min_acu        = 0.5
  max_acu        = 2
  instance_count = 1

  tags = local.common_tags
}

################################################################################
# ECS — Fargate Backend
################################################################################
module "ecs" {
  source = "../../modules/ecs"

  name               = "${local.name}-${local.environment}"
  environment        = local.environment
  aws_region         = var.aws_region
  vpc_id             = module.vpc.vpc_id
  public_subnet_ids  = module.vpc.public_subnet_ids
  private_subnet_ids = module.vpc.private_subnet_ids

  container_image = var.backend_image
  container_port  = 8000
  task_cpu        = 256
  task_memory     = 512
  desired_count   = 1
  min_capacity    = 1
  max_capacity    = 4

  s3_bucket_name = module.s3.uploads_bucket_name

  env_vars = {
    APP_NAME    = "MesrAI Demo API"
    DEBUG       = "false"
    AWS_REGION  = var.aws_region
    S3_BUCKET_NAME = module.s3.uploads_bucket_name
  }

  secrets = {
    DATABASE_URL = module.rds.db_password_secret_arn
    SECRET_KEY   = aws_secretsmanager_secret.app_secret_key.arn
  }

  tags = local.common_tags
}

################################################################################
# S3 + CloudFront — Frontend
################################################################################
module "s3" {
  source = "../../modules/s3"

  name            = "${local.name}-${local.environment}"
  environment     = local.environment
  api_domain_name = module.ecs.alb_dns_name

  tags = local.common_tags
}

################################################################################
# App Secret Key (Secrets Manager)
################################################################################
resource "random_password" "app_secret_key" {
  length  = 64
  special = false
}

resource "aws_secretsmanager_secret" "app_secret_key" {
  name                    = "${local.name}/${local.environment}/app-secret-key"
  recovery_window_in_days = 0
  tags                    = local.common_tags
}

resource "aws_secretsmanager_secret_version" "app_secret_key" {
  secret_id     = aws_secretsmanager_secret.app_secret_key.id
  secret_string = random_password.app_secret_key.result
}
