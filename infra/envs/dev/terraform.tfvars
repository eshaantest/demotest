aws_region         = "us-east-1"
vpc_cidr           = "10.0.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b"]

# Update this after pushing your Docker image to ECR
backend_image = "public.ecr.aws/nginx/nginx:latest"
