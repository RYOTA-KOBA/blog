# ADR-003: インフラコードの管理方法

## ステータス
承認済み

## 背景
インフラストラクチャをコード化して管理するための方法論を決定する必要があります。

## 検討項目
- IaC ツール: Terraform、CloudFormation、ARM テンプレート など
- 構成管理: Ansible、Chef、Puppet など
- ワークフロー: 手動デプロイ、CI/CD 統合

## 決定内容
**Terraform を採用し、GitHub との連携でコード管理を実施する**

## 採択理由
1. **マルチクラウド対応**: Cloudflare だけでなく、他の IaaS への拡張が容易
2. **宣言型構文**: 直感的で読みやすい
3. **State 管理**: リソースの状態を自動で追跡
4. **コミュニティ**: 多くのプロバイダーとモジュールが用意されている
5. **バージョン管理**: Git での管理が標準

## 代替案
- **CloudFormation**: AWS 専用で、Cloudflare には非対応
- **Pulumi**: 多言語対応だが、学習曲線が急

## トレードオフ
- State ファイルの管理が必要
- 複雑な環境では管理が煩雑になる可能性

## 実装ガイドライン
- `terraform.tfvars.example` をテンプレートとして提供
- `.gitignore` に State ファイルを含める
- リモート State ストレージの利用を検討

## 参考資料
- [Terraform Documentation](https://www.terraform.io/docs)
- [Terraform Best Practices](https://developer.hashicorp.com/terraform/cloud-docs/workspaces)
