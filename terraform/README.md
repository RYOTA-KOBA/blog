# Terraform Deployment Guide

## 概要

このガイドでは、Terraform を使用して Cloudflare Pages にブログをデプロイする手順を説明します。

## 前提条件

### 必要なツール
- Terraform >= 1.0
- GitHub アカウント
- Cloudflare アカウント

### 必要な情報
以下の情報を事前に準備してください：

1. **Cloudflare API Token**
   - Cloudflare ダッシュボードから取得

2. **Cloudflare Account ID**
   - Cloudflare ダッシュボード → アカウント情報から確認

3. **Cloudflare Zone ID** （オプション）
   - カスタムドメインを使用する場合のみ必要
   - 初期設定では不要（Cloudflare Pages `.pages.dev` ドメインを使用）

4. **GitHub Personal Access Token**
   - `repo` と `workflow` スコープを付与
   - [GitHub Settings](https://github.com/settings/tokens) から取得

5. **GitHub Repository Information**
   - Owner: GitHub ユーザー名
   - Repository: リポジトリ名（デフォルト: `blog`）

## セットアップ手順

### Step 1: Terraform 初期化

```bash
cd terraform
terraform init
```

このコマンドで Terraform の状態ファイルと プロバイダーがセットアップされます。

### Step 2: 環境変数ファイルの作成

`terraform.tfvars.example` をコピーして `terraform.tfvars` を作成します：

```bash
cp terraform.tfvars.example terraform.tfvars
```

### Step 3: 変数値の設定

`terraform.tfvars` を編集して、実際の値を設定します：

```hcl
# Cloudflare API Token (sensitive)
cloudflare_api_token = "your-actual-cloudflare-api-token"

# Cloudflare Account ID
cloudflare_account_id = "your-account-id-12345"

# Cloudflare Zone ID (オプション - カスタムドメイン使用時のみ)
# cloudflare_zone_id = "your-zone-id-67890"

# GitHub Information
github_owner = "your-github-username"
github_token = "your-github-personal-access-token"

# デプロイ対象ブランチ
production_branch = "main"

# (オプション) プロジェクト名のカスタマイズ
project_name = "my-blog"
```

### Step 4: Terraform Plan の実行

変更内容を確認します：

```bash
terraform plan
```

このコマンドで、Terraform が何をリソースを作成・変更・削除するかを表示します。

### Step 5: Terraform Apply の実行

実際にリソースを作成します：

```bash
terraform apply
```

確認メッセージで `yes` を入力してください。

## デプロイ後

### 出力値の確認

デプロイ後、以下のコマンドで出力値を確認できます：

```bash
terraform output
```

主要な出力値：
- `cloudflare_pages_project_url`: Cloudflare Pages のプロジェクト URL
- `cloudflare_pages_project_name`: プロジェクト名

### GitHub との連携確認

1. Cloudflare ダッシュボードにアクセス
2. Pages セクションで新しいプロジェクトを確認
3. GitHub リポジトリの `main` ブランチへのコミットが自動デプロイされることを確認

### デプロイフィルターの設定（オプション）

デフォルトではすべてのコミットでビルド・デプロイが実行されます。特定のファイル変更時のみデプロイしたい場合は、Cloudflare Pages で以下の設定を行います：

**Cloudflare UI での設定:**

1. **Cloudflare ダッシュボード → Pages → blog プロジェクト**
2. **Settings → Build settings**
3. **Build on commit** セクションで：
   - **Include paths**: `public/articles/**` （記事ファイル変更時のみデプロイ）

これにより、`public/articles/` 配下の変更時のみビルド・デプロイが実行されます。

**注意**: 
- この設定は Terraform からは管理できません
- Cloudflare UI で手動設定する必要があります
- 設定後、`terraform apply` を再実行しても設定は保持されます

## デプロイフロー

### 記事を投稿してデプロイする手順

1. **記事ファイルを作成**
   ```bash
   cat > public/articles/new-post.md << 'EOF'
   ---
   title: "新しい記事"
   date: "2026-01-11"
   category: "技術"
   excerpt: "記事の概要"
   ---
   
   # 記事本文
   EOF
   ```

2. **ローカルで確認**
   ```bash
   npm run dev
   # http://localhost:3000 にアクセスして確認
   ```

3. **Git にコミット・プッシュ**
   ```bash
   git add public/articles/new-post.md
   git commit -m "Add: 新しい記事をポスト"
   git push origin main
   ```

4. **自動デプロイを確認**
   - Cloudflare ダッシュボード → Pages で デプロイ状況を確認
   - デプロイ完了後、ブログサイトに新しい記事が反映されます

## カスタムドメインの設定（オプション）

独自のドメイン（例: blog.example.com）を使用する場合は、以下の手順で DNS を設定します：

### Step 1: Cloudflare に Zone ID を登録

`terraform.tfvars` を編集して、Zone ID を設定します：

```hcl
cloudflare_zone_id = "your-actual-zone-id"
```

Zone ID は Cloudflare ダッシュボード → ドメイン設定 → Overview から確認できます。

### Step 2: 再度 Terraform Apply

```bash
terraform plan
terraform apply
```

### Step 3: DNS レコード設定

Cloudflare ダッシュボード → DNS → レコード追加で、CNAME レコードを設定します：

```
名前: blog
コンテンツ: <your-project>.pages.dev
TTL: Auto
```

詳細は [Cloudflare Pages のドメイン設定ドキュメント](https://developers.cloudflare.com/pages/get-started/#custom-domain) を参照してください。

## トラブルシューティング

### Terraform Apply 時のエラー

#### エラー: "Invalid authentication token"
```
Error: Invalid authentication token
```

**解決方法:**
- Cloudflare API Token が正しいか確認
- Token に必要な権限（Pages/Projects 関連）があるか確認

#### エラー: "Account ID is invalid"
```
Error: Account ID is invalid
```

**解決方法:**
- Cloudflare Account ID が正しいか再確認
- Account ID は 16-32 桁の英数字

### デプロイが自動実行されない

**確認項目:**
1. GitHub Token に `repo` スコープがあるか確認
2. GitHub リポジトリが public または private で、Cloudflare が アクセス可能か確認
3. 記事は `main` ブランチにプッシュされているか確認

### ビルドエラー

**確認方法:**
1. Cloudflare ダッシュボード → Pages → デプロイ履歴
2. 失敗したデプロイをクリックして、ビルドログを確認

## State ファイル管理

### ローカル State の注意点

現在の設定はローカルに `terraform.tfstate` を保存しています。

**推奨事項:**
- `.gitignore` に `terraform.tfstate*` が含まれていることを確認
- チーム開発時は、リモート State ストレージを使用

### リモート State への移行

Terraform Cloud または AWS S3 を使用する場合は、`backend.tf` を更新してください。

```hcl
# 例: Terraform Cloud の場合
terraform {
  cloud {
    organization = "your-organization"
    workspaces {
      name = "blog-production"
    }
  }
}
```

## 既存リソースの破棄

すべてのリソースを削除する場合：

```bash
terraform destroy
```

## Advanced Topics

### 複数環境の管理

`terraform.tfvars` を環境ごとに分けて管理：

```bash
terraform apply -var-file="terraform.staging.tfvars"
terraform apply -var-file="terraform.production.tfvars"
```

### Modules の使用

大規模プロジェクトの場合、Modules を使用して再利用可能な構成を実装できます。

## 参考資料

- [Terraform Cloudflare Provider](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Terraform Best Practices](https://developer.hashicorp.com/terraform/cloud-docs/workspaces)

## FAQ

### Q: 既にデプロイされたプロジェクトを Terraform で管理できますか？

A: はい。`terraform import` コマンドを使用して既存リソースを Terraform の管理下に移行できます：

```bash
terraform import cloudflare_pages_project.blog <project-id>
```

### Q: 本番環境と開発環境を分けたいです

A: `terraform.tfvars` を複数作成し、環境ごとに異なる値を設定することで実現できます。

### Q: ドメインを設定したいです

A: `terraform/main.tf` でルート設定を追加することで可能です。Cloudflare のドメイン設定を確認してください。

## Support

問題が発生した場合は、以下をご確認ください：

1. 入力値（API Token、Account ID など）が正しいか
2. GitHub Token の権限が十分か
3. Cloudflare アカウントでプロジェクト作成が可能か
4. Terraform のバージョンが >= 1.0 か
