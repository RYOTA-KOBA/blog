# 個人ブログ

Next.js と Markdown を使用した、シンプルで拡張可能な個人ブログです。

## 特徴

- **Next.js (App Router)**: React ベースの最新フレームワーク
- **Markdown 記事**: Front Matter でメタデータを管理
- **自動分類**: カテゴリ別・月別の記事一覧
- **レスポンシブデザイン**: Tailwind CSS で実装
- **インフラ管理**: Terraform で Cloudflare Pages を管理

## プロジェクト構造

```
blog/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React コンポーネント
│   ├── lib/             # ユーティリティ関数
│   └── types/           # TypeScript 型定義
├── public/
│   └── articles/        # Markdown 記事ファイル
├── terraform/           # Cloudflare Pages の設定
└── docs/               # ADR とドキュメント
```

## セットアップ

### 前提条件
- Node.js 20 以上
- npm または yarn
- (デプロイ時) Cloudflare アカウント

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションが起動します。

## 記事の投稿方法

### 1. Markdown ファイルの作成

`public/articles/` ディレクトリに新しい Markdown ファイルを作成します。

```bash
touch public/articles/my-first-post.md
```

### 2. Front Matter の設定

ファイルの先頭に Front Matter でメタデータを記述します。

```markdown
---
title: "記事のタイトル"
date: "2026-01-11"
category: "技術"
excerpt: "記事の概要（省略可）"
---

# ここから記事本文
```

### 3. Markdown で本文を記述

Front Matter の後に、通常の Markdown で記事本文を記述します。

```markdown
## セクション1

本文の内容...

## セクション2

より詳しい説明...
```

### 4. デプロイ

- **ローカルテスト**: `npm run dev` で開発サーバーを起動し、内容を確認
- **自動デプロイ**: リポジトリの `main` ブランチにプッシュすると、自動的に Cloudflare Pages にデプロイされます

### 投稿例

```markdown
---
title: "Next.js で個人ブログを作成した"
date: "2026-01-11"
category: "Next.js"
excerpt: "Next.js と Markdown を使った個人ブログの実装方法について"
---

# Next.js で個人ブログを作成した

Next.js は React ベースのフレームワークです...

## 利点

1. SSR/SSG が標準で対応
2. ファイルベースのルーティング
3. 優れた開発体験

## まとめ

Next.js は個人ブログに最適なフレームワークです。
```

## 記事の管理

### カテゴリ別表示

`/categories/[category]` でカテゴリ別の記事一覧を表示します。
記事の Front Matter に `category` を指定すると、自動的に分類されます。

### 月別アーカイブ

`/archive/[year]/[month]` で指定年月の記事一覧を表示します。
記事の日付を基準に自動で分類されます。

## 開発

### ビルド

```bash
npm run build
```

### 本番環境実行

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## デプロイ

### Cloudflare Pages へのデプロイ

1. **初期セットアップ**

   ```bash
   # Terraform の初期化
   cd terraform
   terraform init
   ```

2. **環境変数の設定**

   `terraform/terraform.tfvars` を作成し、以下の値を設定します：

   ```hcl
   cloudflare_api_token = "your-cloudflare-api-token"
   cloudflare_account_id = "your-account-id"
   cloudflare_zone_id = "your-zone-id"
   github_owner = "your-github-username"
   github_token = "your-github-token"
   production_branch = "main"
   ```

3. **リソースの作成**

   ```bash
   terraform plan   # 変更内容を確認
   terraform apply  # リソースを作成
   ```

4. **GitHub との連携**

   デプロイ後、Cloudflare Pages は GitHub リポジトリの `main` ブランチの更新を監視します。
   新しいコミットがプッシュされると、自動的にビルド・デプロイされます。

### 認証情報の取得方法

#### Cloudflare API Token
1. Cloudflare ダッシュボード → マイプロフィール
2. API トークン → 新しいトークンを作成
3. カスタムトークンを作成し、必要な権限を設定

#### GitHub Token
1. GitHub → Settings → Developer settings → Personal access tokens
2. `repo` と `workflow` の権限を付与

## ドキュメント

詳細は以下をご覧ください：

- [ADR-001: フロントエンドフレームワーク選定](docs/ADR-001-frontend-framework.md)
- [ADR-002: インフラストラクチャ選定](docs/ADR-002-infrastructure.md)
- [ADR-003: インフラコードの管理方法](docs/ADR-003-iac-management.md)
- [ADR-004: Markdown 記事の管理方法](docs/ADR-004-markdown-management.md)

## トラブルシューティング

### 記事が表示されない

- ファイル名が `.md` で終わっていることを確認
- Front Matter の YAML 構文が正しいことを確認
- 日付形式が `YYYY-MM-DD` であることを確認

### ビルドエラー

```bash
# 依存関係を再インストール
npm install

# キャッシュをクリア
npm run clean
npm run build
```

## ライセンス

MIT

## 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Gray Matter Documentation](https://github.com/jonschlinkert/gray-matter)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Terraform Documentation](https://www.terraform.io/docs)


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
