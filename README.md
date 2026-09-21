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

公開URLは `https://bitsalon.bitspace.jp/` です（カスタムドメイン）。

`vite.config.ts` の `base` は `'/'` です。React Router の `basename` は `import.meta.env.BASE_URL` を参照するため、`base` を変えると自動で追従します。

## 手動設定が必要な項目

Claude Code や CI では自動化できないため、次の項目は人が設定してください。

- リポジトリの Settings → Pages → Build and deployment の Source を **GitHub Actions** に設定する
- リポジトリの Settings → Pages → Custom domain に `bitsalon.bitspace.jp` を設定し、証明書の発行後に **Enforce HTTPS** を有効にする
- Google アナリティクスの測定IDを設定する（下記「アクセス解析」）
- プライバシーポリシーのページを用意する（Google アナリティクスは Cookie を使うため）
- SNS共有カード用の画像（1200×630）を `public/` に置き、`index.html` に `og:image` と `twitter:card` の `summary_large_image` を追加する（現在は画像なしの `summary`）

### カスタムドメインの構成

- DNS は、さくらインターネットの `bitspace.jp` ゾーン編集で `bitsalon` の CNAME を `ohura-bitspace.github.io.`（末尾のドットが必要）に向けています。
- さくらのコントロールパネルの「ドメイン新規追加」は使いません。追加すると、さくらのWeb公開・メールの設定が対象になり、GitHub Pages への向き先と無関係な設定が増えます。
- `bitspace.jp` 本体のメール（MX はさくら）とホームページ（GitHub Pages）には影響しません。
- GitHub Actions で公開しているため、`CNAME` ファイルは不要です（GitHub の公式ドキュメントに「カスタムワークフローで公開する場合、既存の `CNAME` ファイルは無視され、必須ではない」とあります）。
- ドメインを変更する場合は、`index.html` の `og:url` も書き換えます。`canonical` は実行時に現在のURLから組み立てるため変更不要です。

## アクセス解析

Google アナリティクス（GA4）を使います。測定IDはリポジトリ直下の `.env.production` に書きます。

```
VITE_GA_ID=G-XXXXXXXXXX
```

- 測定IDはページのソースに出る公開情報なので、コミットして構いません。
- 未設定のままビルドすると計測タグを読み込みません（実測: 未設定のビルド成果物に `googletagmanager` の記述なし）。
- ビルド時に埋め込む値のため、変更後は再デプロイが必要です。
- 画面遷移ごとの `page_view` と、問い合わせフォームのボタンのクリック（イベント名 `form_cta_click`）を送ります。

## 特定商取引法に基づく表記について

表示義務項目は事業者本人の確認済みの内容を記載しています。推測で書き換えないでください。

## 参考資料

既存の販促物（サービス資料・チラシ・PDF）は `reference/` にまとめています。ビルド対象ではありません。
記載価格は旧価格なので、扱いは [reference/README.md](reference/README.md) を参照してください。

## 404 対策

GitHub Pages は未知のパスへ直接アクセスされたときに `404.html` を返します。SPA のルーティングを維持するため、ビルド後に `dist/index.html` を `dist/404.html` へコピーする方式にします。

このコピー処理は `package.json` の `postbuild` で行います。`public/404.html` は作成しません。
