# GitHub Setup Guide

このガイドでは、ブログプロジェクトを GitHub で管理するための手順を説明します。

## 前提条件

- GitHub アカウント
- Git がインストールされている
- プロジェクトがローカルで初期化されている

## セットアップ手順

### Step 1: GitHub リポジトリを作成

1. [GitHub](https://github.com) にログイン
2. 右上の `+` アイコンから「New repository」を選択
3. リポジトリの詳細を入力：
   - **Repository name**: `blog`
   - **Description**: "Personal blog built with Next.js, Markdown, and Terraform"
   - **Visibility**: Public または Private を選択
   - **.gitignore**: Node を選択（既に設定されています）
4. 「Create repository」をクリック

### Step 2: リモートリポジトリを追加

作成したリポジトリの URL をコピーして、以下のコマンドを実行：

```bash
cd /Users/rk/Workspace/blog

# リモートリポジトリを追加
git remote add origin https://github.com/YOUR_USERNAME/blog.git

# リモートリポジトリを確認
git remote -v
```

出力例：
```
origin  https://github.com/YOUR_USERNAME/blog.git (fetch)
origin  https://github.com/YOUR_USERNAME/blog.git (push)
```

### Step 3: ブランチをリモートにプッシュ

```bash
# main ブランチを origin にプッシュ
git branch -M main
git push -u origin main
```

### Step 4: SSH キーの設定（推奨）

毎回パスワードを入力しないようにするため、SSH キーの設定を推奨します。

#### SSH キーを生成（既に設定済みの場合はスキップ）

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

#### SSH キーを GitHub に登録

1. GitHub → Settings → SSH and GPG keys
2. 「New SSH key」をクリック
3. 公開鍵の内容を貼り付け
4. SSH 接続をテスト：

```bash
ssh -T git@github.com
```

成功時の出力：
```
Hi YOUR_USERNAME! You've successfully authenticated, but GitHub does not provide shell access.
```

#### リモート URL を SSH に変更

```bash
git remote set-url origin git@github.com:YOUR_USERNAME/blog.git
```

## ブランチ戦略

### 推奨ブランチ構成

```
main                    # 本番環境 (protectedブランチ)
├─ develop             # 開発環境
│  └─ feature/xxx      # 機能ブランチ
```

### 開発ブランチの作成

```bash
# develop ブランチを作成
git checkout -b develop
git push -u origin develop

# feature ブランチの例
git checkout -b feature/dark-mode
# ... 開発作業 ...
git push -u origin feature/dark-mode
```

## GitHub Actions の設定

Cloudflare Pages への自動デプロイを設定するには、`.github/workflows/deploy.yml` を作成します：

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
```

詳細は [terraform/README.md](../terraform/README.md) を参照してください。

## Terraform State の管理

### 注意点

現在、Terraform State はローカルに保存されています。

**セキュリティ上の注意:**
- `terraform.tfstate` ファイルには機密情報が含まれるため、**Git にはコミットしないでください**
- `.gitignore` に以下を追加済み：
  ```
  terraform/terraform.tfstate*
  terraform/.terraform/
  ```

### リモート State への移行（推奨）

チーム開発の場合、リモート State を使用してください：

```bash
# Terraform Cloud の場合
# 1. https://app.terraform.io で Organization と Workspace を作成
# 2. API Token を生成
# 3. ~/.terraformrc に認証情報を設定
# 4. backend.tf を更新
```

詳細は [terraform/README.md](../terraform/README.md#state-ファイル管理) を参照。

## 記事をプッシュしてデプロイ

### 典型的なワークフロー

```bash
# 1. develop ブランチで作業
git checkout develop

# 2. 機能ブランチを作成
git checkout -b feature/article-xxx

# 3. 記事を作成
cat > public/articles/my-article.md << 'EOF'
---
title: "タイトル"
date: "2026-01-11"
category: "カテゴリ"
excerpt: "概要"
---

# 本文
EOF

# 4. ローカルで確認
npm run dev
# http://localhost:3000 で確認

# 5. コミット・プッシュ
git add public/articles/my-article.md
git commit -m "feat: Add article about xxx"
git push origin feature/article-xxx

# 6. GitHub で Pull Request を作成
# 7. レビュー後、merge を実行
# 8. main ブランチにマージされると自動デプロイ
```

## トラブルシューティング

### "fatal: not a git repository" エラー

```bash
cd /Users/rk/Workspace/blog
git status
```

### リモート接続エラー

```bash
# リモート接続をテスト
git ls-remote origin

# リモート設定を確認
git remote -v
```

### パスワード認証が失敗する

GitHub では Personal Access Token (PAT) を使用してください：

1. GitHub → Settings → Developer settings → Personal access tokens
2. 新しいトークンを生成（`repo` スコープを付与）
3. Clone や Push 時にトークンをパスワードとして使用

または SSH キーを設定してください（推奨）。

## 参考資料

- [GitHub Docs - Git の基本](https://docs.github.com/ja/get-started/quickstart/hello-world)
- [GitHub Docs - リモートリポジトリについて](https://docs.github.com/ja/get-started/getting-started-with-git/about-remote-repositories)
- [GitHub Docs - SSH キーの生成](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

## 次のステップ

1. リモートリポジトリにプッシュ
2. Cloudflare Pages との連携を設定（[terraform/README.md](../terraform/README.md) 参照）
3. GitHub Actions で自動デプロイを設定
4. 記事を作成・投稿開始
