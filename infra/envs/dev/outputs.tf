output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "alb_dns_name" {
  description = "Backend API ALB DNS name"
  value       = module.ecs.alb_dns_name
}

output "cloudfront_domain" {
  description = "Frontend CloudFront domain"
  value       = module.s3.cloudfront_domain_name
}

output "frontend_bucket" {
  description = "S3 bucket for frontend assets"
  value       = module.s3.frontend_bucket_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (for cache invalidation)"
  value       = module.s3.cloudfront_distribution_id
}

output "db_endpoint" {
  description = "Aurora cluster endpoint"
  value       = module.rds.cluster_endpoint
  sensitive   = true
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = module.ecs.cluster_name
}

output "ecs_service_name" {
  description = "ECS service name"
  value       = module.ecs.service_name
}
