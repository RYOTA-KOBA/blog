resource "cloudflare_r2_bucket" "terraform_state" {
  account_id = var.cloudflare_account_id
  name       = var.r2_bucket_name
}

output "r2_bucket_name" {
  description = "Name of the R2 bucket created for terraform state"
  value       = cloudflare_r2_bucket.terraform_state.name
}
