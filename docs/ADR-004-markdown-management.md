# ADR-004: Markdown 記事の管理方法

## ステータス
承認済み

## 背景
ブログ記事を効率的に管理・投稿するための方法論を決定する必要があります。

## 検討項目
- 記事フォーマット: Markdown、reStructuredText、HTML など
- メタデータ管理: Front Matter、データベース、別ファイル
- 記事保存場所: Git リポジトリ、外部 CMS

## 決定内容
**Markdown + Front Matter を採用し、Git リポジトリで管理する**

## 採択理由
1. **シンプル**: Markdown は記述が簡単で、Git で管理しやすい
2. **バージョン管理**: Git の履歴機能で変更追跡が可能
3. **Front Matter**: メタデータ（タイトル、日付、カテゴリ）を記事ファイルに含める
4. **デプロイフロー**: リポジトリにプッシュするだけで自動デプロイ
5. **外部依存なし**: CMS などに依存しない独立したシステム

## メタデータ構造
```yaml
---
title: "記事タイトル"
date: "2026-01-11"
category: "カテゴリ名"
excerpt: "記事の概要"
---
```

## 代替案
- **データベース + CMS**: 複雑だが、動的なコンテンツ管理に向いている
- **Headless CMS**: 柔軟だが、セットアップが複雑

## 記事投稿フロー
1. `public/articles/` に新しい Markdown ファイルを作成
2. Front Matter でメタデータを設定
3. Git にコミット＆プッシュ
4. GitHub Actions で自動ビルド・デプロイ

## 参考資料
- [Gray Matter Documentation](https://github.com/jonschlinkert/gray-matter)
- [Markdown Specification](https://spec.commonmark.org/)
