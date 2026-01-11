variable "r2_bucket_name" {
  description = "R2 bucket name for storing terraform state"
  type        = string
  default     = "tfstate-for-blog"
}

variable "r2_location_hint" {
  description = "Optional location hint for R2 (e.g. 'EU')"
  type        = string
  default     = ""
}

variable "r2_account_id" {
  description = "Cloudflare account id for R2 (used for endpoint construction)"
  type        = string
  default     = ""
}

# Note: We do not create access keys here. Create an API token or R2 access key
# and store credentials as GitHub Secrets (R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY).
