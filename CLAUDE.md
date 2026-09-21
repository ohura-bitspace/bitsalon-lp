# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## このリポジトリについて

サロン向け予約・顧客管理サービス **bitSalon** の紹介LP。トップページと「特定商取引法に基づく表記」ページの2ページ構成。
Vite + React + TypeScript + React Router。スタイルは素のCSS（CSS Modules は使わない）。MUI 非依存。

## コマンド

```bash
npm install
npm run dev      # Vite 開発サーバ
npm run build    # tsc（型チェック）→ vite build → postbuild で dist/404.html を複製
npm run preview  # dist/ を本番と同じ /bitsalon-lp/ 配下で配信（先に build）
```

- テストランナーは未導入。変更の検証は `npm run build`（型チェックを含む）と、開発サーバでの目視で行う。
- 同じ手順が `.vscode/tasks.json` にタスクとして定義されている。

## デプロイと URL の前提

`main` への push で GitHub Actions が GitHub Pages へ自動デプロイする（`.github/workflows/deploy.yml`）。
公開URLは `https://ohura-bitspace.github.io/bitsalon-lp/`。

プロジェクトサイト配下で動かすため、次の3つが揃っている必要がある。1つでも欠けるとリンクかアセットが壊れる。

- `vite.config.ts` の `base: '/bitsalon-lp/'`
- `App.tsx` の `<BrowserRouter basename={import.meta.env.BASE_URL}>`
- `package.json` の `postbuild`（`dist/index.html` を `dist/404.html` へ複製）

`404.html` は GitHub Pages が未知のパスに返すファイルで、SPA のルーティングを維持するための仕組み。`public/404.html` は作らない。
`index.html` 内の絶対パス参照は `%BASE_URL%`（Vite がビルド時に置換）を使う。

## 構成の要点

`App` → `Layout` → 各ページ。`HomePage` は `src/sections/` のセクションを縦に並べるだけで、ロジックを持たない。

**`src/components/Layout.tsx` が横断的な処理を集約している**。ページを追加・変更するときはここを見る。

- ハッシュリンクのスクロール（React Router のクライアント遷移ではブラウザのハッシュスクロールが効かないため自前で処理）
- ページごとの `document.title` と `canonical`（静的な `<head>` に書くと全ページ同じ値を名乗ってしまうため実行時に差し替える）
- GA4 の初期化とページビュー送信

**料金の単一ソースは `src/data/plans.ts`**。`PricingSection` と `Hero`（最安プランの月額）がここを参照する。金額は数値で持ち、表示整形は `formatAmount`（`ja-JP` 固定）で行う。金額を変えるときはこのファイルだけを直す。ただし `features` 配列の文言に埋め込まれた金額（「追加店舗 +¥4,000/月」など）は文字列のままなので別途確認する。

**`src/sections/ProductMock.tsx` は実アプリ（`salon-reserve-mobile`）の管理画面を再現したモック**。LP 中で最も大きいコンポーネント。

- 日付は表示時点から生成する（`weekStart` は直近の土曜、来店履歴は経過日数）。固定日付に戻さないこと。時間が経つと「過去の予約表」を見せることになる。
- 曜日の色分けと予定データは配列の位置で対応している（`dayTones` と `schedule`）。片方だけ要素を増やすと表示時に落ちる。
- 配色は `.mock__frame` にスコープした独自トークン（`--mock-pink` など）で持つ。LP のブランドトークンとは別系統だが、実画面の再現が目的なので意図的。

## スタイルの決まり

- デザイントークンは `src/index.css` の `:root` に集約。余白は `--space-*`、角丸は `--radius-*` を使い、両者を流用しない。
- 同ファイル冒頭にコントラスト比の実測値と禁止事項（白文字を `--accent` / `--mint` に載せない等）がコメントで書かれている。配色を足すときは必ず読む。
- CSS はコンポーネントと同名の `.css` を隣に置き、対応する `.tsx` から import する。クラス名は BEM 風（`block__element--modifier`）。

## 計測（GA4）

`src/analytics.ts`。測定IDは `.env.production` の `VITE_GA_ID` から読む。**未設定ならタグを一切読み込まない**（ビルド時に該当コードごと消える）。ビルド時に埋め込む値なので、設定・変更後は再デプロイが必要。
送信しているのは画面遷移ごとの `page_view` と、問い合わせフォームのボタンのクリック（`form_cta_click`）。

## 編集時に踏んではいけない地雷

- **特商法ページ（`src/pages/TokushohoPage.tsx`）の値は法令上の表示義務項目**。文言を推測で書き換えない。個人事業者の氏名欄には戸籍上の氏名が必要で、通称・屋号・サイト名のみでは要件を満たさない（消費者庁「通信販売広告Q&A」Q16）。値に `[` を含む行は「未確定」バッジが自動で付く。
- **料金の参照元は `salon-reserve-mobile` リポジトリの `src/admin/features/settings/AdminPlanSettings.jsx`（`PLAN_GROUPS`）**。LP 側だけで金額を決めない。
- **`reference/` はビルド対象外の販促物で、記載価格は旧価格**。現行の料金・仕様の根拠として引用しない。LP のスコープ外として意図的に除外した訴求要素（ホットペッパービューティー連携など）もある。詳細は `reference/README.md`。
- **複数店舗向けプランは折りたたみで初期非表示**にしている。個人・小規模サロン向けを前面に出す方針によるもので、既定で開く状態に戻さない。
- **問い合わせ導線は Google フォームへのリンク1本**（`src/sections/CtaSection.tsx`）。静的配信のためフォームの送信先を自前で持てない。
