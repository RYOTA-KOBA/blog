// Non-destructive descriptive outputs to provide human-friendly information
// These outputs do not modify resources and are safe to add as a minimal diff.

output "r2_bucket_info" {
  description = "Name of the Cloudflare R2 bucket used for terraform state (non-sensitive)."
  value       = try(cloudflare_r2_bucket.terraform_state.name, var.r2_bucket_name)
}

output "infra_summary" {
  description = "Human-friendly description of this infrastructure configuration."
  value       = "Cloudflare Pages project: ${var.project_name}"
}
