output "vpc_id" {
  value = module.vpc.vpc_id
}

output "db_host" {
  value = module.rds.db_host
}

output "s3_bucket_name" {
  value = module.s3.bucket_name
}

output "load_balancer_dns" {
  value = module.ecs.load_balancer_dns
}
