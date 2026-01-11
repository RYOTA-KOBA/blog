# ADR-002: インフラストラクチャ選定

## ステータス
承認済み

## 背景
個人ブログの静的・動的コンテンツをホスティングするためのインフラストラクチャを選定する必要があります。

## 検討項目
- ホスティングサービス: Vercel、Netlify、GitHub Pages、Cloudflare Pages など
- コスト: 予算の制約
- パフォーマンス: グローバルなネットワーク対応
- 管理方法: IaC との組み合わせ

## 決定内容
**Cloudflare Pages を採用し、Terraform で管理する**

## 採択理由
1. **グローバルエッジロケーション**: Cloudflare の CDN により高速配信
2. **コスト効率**: 無料枠が充実しており、個人ブログに最適
3. **GitHub 統合**: Git リポジトリとの連携が簡単
4. **IaC 対応**: Terraform で完全管理可能
5. **セキュリティ**: Cloudflare のセキュリティ機能が利用可能

## 代替案
- **Vercel**: Next.js 開発元が提供し、UX が優れているが、IaC が標準では提供されない
- **Netlify**: 多機能だが、Cloudflare Pages の方がシンプルで十分
- **GitHub Pages**: 静的サイトのみ対応

## トレードオフ
- Vercel よりセットアップが複雑な場合がある
- Cloudflare の仕様変更の影響を受ける可能性

## 影響範囲
- デプロイパイプライン
- ドメイン管理
- インフラストラクチャコスト

## 参考資料
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Terraform Provider](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs)
