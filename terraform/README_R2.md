Using Cloudflare R2 for Terraform state

This repository includes `r2.tf` which declares a `cloudflare_r2_bucket` resource to hold terraform state.

Notes and required GitHub Secrets:
- R2 does not provide a built-in Terraform state locking mechanism. Using R2 for tfstate is possible but carries a risk of concurrent `apply` conflicts. Prefer Terraform Cloud or another backend that supports locking if possible.

Required GitHub Secrets (used by GitHub Actions workflows):
- `R2_BUCKET` — the name of the R2 bucket (or set via Terraform by running locally)
- `R2_ACCOUNT_ID` — your Cloudflare account id (used to build endpoint)
- `R2_ENDPOINT` — endpoint for R2, e.g. `https://<account_id>.r2.cloudflarestorage.com`
- `R2_ACCESS_KEY_ID` — R2 access key id
- `R2_SECRET_ACCESS_KEY` — R2 secret
- `R2_TFSTATE_KEY` — path/key for the terraform state file in the bucket (e.g. `terraform/terraform.tfstate`)

CI behavior:
- Workflows `terraform-plan.yml` and `terraform-apply.yml` were updated to initialize the S3-compatible backend pointing to R2 using the above secrets. They will pass these values to `terraform init -backend-config=...`.

How to proceed:
1. (Optional) Run `terraform apply` locally to create the R2 bucket declared in `r2.tf` — this requires your local terraform environment to be configured with `cloudflare` provider credentials.
2. Create the R2 access keys (via Cloudflare dashboard) and add the GitHub Secrets listed above.
3. Open a PR that modifies `terraform/**` to validate the plan job posts sanitized plan output.

Caveat: If you need safe locking, consider using Terraform Cloud or another backend that supports locking; R2 alone does not provide that.
