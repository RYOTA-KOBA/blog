variable "cloudflare_api_token" {
  description = "Cloudflare API Token"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID (Optional - only needed for custom domain)"
  type        = string
  default     = ""
}

variable "project_name" {
  description = "Cloudflare Pages Project Name"
  type        = string
  default     = "blog"
}

variable "github_owner" {
  description = "GitHub Repository Owner"
  type        = string
}

variable "github_repo" {
  description = "GitHub Repository Name"
  type        = string
  default     = "blog"
}

variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true
}

variable "production_branch" {
  description = "Production Branch"
  type        = string
  default     = "main"
}
