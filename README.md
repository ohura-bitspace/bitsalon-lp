# bitSalon 紹介LP

## 概要

bitSalon の紹介ランディングページです。トップページと「特定商取引法に基づく表記」ページの 2 ページ構成です。

## 技術構成

- Vite
- React
- TypeScript
- React Router
- 素の CSS（CSS Modules は使用しない）
- MUI 非依存

## 開発手順

```bash
npm install
npm run dev
npm run build
```

## デプロイ

GitHub Actions で `main` ブランチへの push をトリガーに GitHub Pages へ自動デプロイします。

現在の公開URLは `https://ohura-bitspace.github.io/bitsalon-lp/` です。

`vite.config.ts` の `base` と React Router の `basename` は、GitHub Pages のプロジェクトパス `/bitsalon-lp/` を使用します。

## 手動設定が必要な項目

Claude Code や CI では自動化できないため、次の項目は人が設定してください。

- リポジトリの Settings → Pages → Build and deployment の Source を **GitHub Actions** に設定する

### 将来カスタムドメインに移行する場合

1. GitHub の Settings → Pages で Custom domain を設定する
2. DNS プロバイダーで対象サブドメインの CNAME を `ohura-bitspace.github.io` に向ける
3. `vite.config.ts` の `base` を `'/'` に変更する

## 公開前に差し替えが必要なプレースホルダー一覧

| ファイル | プレースホルダー | 内容 |
|---|---|---|
| `src/sections/CtaSection.tsx` | `[LINE_OA_URL]` | LINE公式アカウントのURL |
| `src/pages/TokushohoPage.tsx` | `[代表者氏名]` | 運営統括責任者の氏名（特定商取引法の表示義務項目） |
| `src/pages/TokushohoPage.tsx` | `[TBD]` | サービス提供時期の営業日数（同上） |
| `src/pages/TokushohoPage.tsx` | `[TBD - 要検討]` | 返品・キャンセルポリシー（同上） |

これらの項目は法令上の表示義務に関わるため、推測で埋めずに事業者本人が確認して入力してください。

## 参考資料

既存の販促物（サービス資料・チラシ・PDF）は `reference/` にまとめています。ビルド対象ではありません。
記載価格は旧価格なので、扱いは [reference/README.md](reference/README.md) を参照してください。

## 404 対策

GitHub Pages は未知のパスへ直接アクセスされたときに `404.html` を返します。SPA のルーティングを維持するため、ビルド後に `dist/index.html` を `dist/404.html` へコピーする方式にします。

このコピー処理は `package.json` の `postbuild` で行います。`public/404.html` は作成しません。
