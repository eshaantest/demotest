output "frontend_bucket_name" { value = aws_s3_bucket.frontend.id }
output "frontend_bucket_arn" { value = aws_s3_bucket.frontend.arn }
output "uploads_bucket_name" { value = aws_s3_bucket.uploads.id }
output "cloudfront_domain_name" { value = aws_cloudfront_distribution.main.domain_name }
output "cloudfront_distribution_id" { value = aws_cloudfront_distribution.main.id }
