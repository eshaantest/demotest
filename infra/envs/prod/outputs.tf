output "alb_dns_name" { value = module.ecs.alb_dns_name }
output "cloudfront_domain" { value = module.s3.cloudfront_domain_name }
output "cloudfront_distribution_id" { value = module.s3.cloudfront_distribution_id }
output "ecs_cluster_name" { value = module.ecs.cluster_name }
output "ecs_service_name" { value = module.ecs.service_name }
