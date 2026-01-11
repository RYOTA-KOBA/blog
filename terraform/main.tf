resource "cloudflare_pages_project" "blog" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = var.production_branch

  source {
    type = "github"

    config {
      owner                      = var.github_owner
      repo_name                  = var.github_repo
      production_branch          = var.production_branch
      pr_comments_enabled        = true
      deployments_enabled        = true
      preview_deployment_setting = "none"
      preview_branch_includes    = [""]
    }
  }

  build_config {
    build_command   = "npm run build"
    destination_dir = "out"
    root_dir        = ""
  }
}

output "cloudflare_pages_project_url" {
  description = "Cloudflare Pages Project URL"
  value       = cloudflare_pages_project.blog.domains[0]
}

output "cloudflare_pages_project_name" {
  description = "Cloudflare Pages Project Name"
  value       = cloudflare_pages_project.blog.name
}
