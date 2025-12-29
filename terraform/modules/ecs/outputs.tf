output "load_balancer_dns" {
  value = aws_alb.main.dns_name
}
