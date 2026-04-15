# 学習マップ（記事 ⇔ ファイル対応表）

本リポジトリと [TypeScriptで学ぶ Svelte 5/SvelteKit 学習ガイド](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/) の対応表です。
学習サイトの記事を読みながらコードを追うための「目次」として使ってください。

> **解説は学習サイト側に集約**しています。本リポジトリ内のコードはコメント最小限で、実装そのものを読むことに集中できるようにしています。

## 対象記事

[examples/markdown-blog — Markdownベースのブログシステム](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/examples/markdown-blog/)

## 前提

本サンプルは基礎版 [svelte5-blog-example](https://github.com/shuji-bonji/svelte5-blog-example) を読み終えた前提で構成されています。
ルーティング・Load 関数・レイアウトの基礎は基礎版の [学習マップ](https://github.com/shuji-bonji/svelte5-blog-example/blob/main/docs/learning-map.md) を参照してください。

## 章別対応表

学習サイト記事の章立てと、本リポジトリのファイルの対応です。

| # | 学習サイトの章 | リポジトリのファイル | 主な学習ポイント |
|---|---------------|-------------------|---------------|
| 1 | 特徴 — Markdownベースの記事管理 | [`content/posts/`](../content/posts/) | Front-matter 付き Markdown の記事フォーマット |
| 2 | プロジェクト構成 | リポジトリ全体 | `content/` ディレクトリの分離、glob import を前提とした構成 |
| 3 | Markdownファイルの自動読み込み | [`src/lib/data/articles.ts`](../src/lib/data/articles.ts) | `import.meta.glob('/content/posts/*.md', { query: '?raw', eager: true })`、公開フィルタ、日付ソート |
| 4 | Markdown処理とFront-matter | [`src/lib/utils/markdown.ts`](../src/lib/utils/markdown.ts) | `front-matter` によるメタデータ分離、`marked` によるHTML変換、読了時間計算 |
| 5 | 全文検索の実装 | [`src/lib/utils/search.ts`](../src/lib/utils/search.ts) | `MiniSearch` の初期化、`boost` による重み付け、`fuzzy` / `prefix` オプション |
| 6 | 検索コンポーネント | [`src/lib/components/SearchBox.svelte`](../src/lib/components/SearchBox.svelte) | `$state`、`$props`、`bind:value`、`oninput`、デバウンス処理 |
| 7 | タグクラウドコンポーネント | [`src/lib/components/TagCloud.svelte`](../src/lib/components/TagCloud.svelte) | `Map<string, number>` を props で受け取る、コールバック props、動的クラス |
| 8 | ブログ一覧ページ | [`src/routes/blog/+page.svelte`](../src/routes/blog/+page.svelte) | 複数の `$state` の組み合わせ、`$derived` による条件分岐、検索／タグ／全件の切替 |
| 9 | 静的サイト生成での注意点 | [`src/routes/+layout.ts`](../src/routes/+layout.ts) | `prerender = true`、`url.searchParams` が使えない制約と回避策（`$state` で管理） |
| 10 | パフォーマンス最適化 | 全体 | ビルド時の記事読み込み、検索インデックスの一度だけ構築、検索入力のデバウンス |

## 記事では扱わないファイル

記事の本筋には出てきませんが、完動サンプルとして含まれているファイルです。

| ファイル | 役割 | 備考 |
|---------|------|-----|
| [`src/lib/types/blog.ts`](../src/lib/types/blog.ts) | 型定義 | `Article`、`ArticleFrontmatter`、`SearchableArticle` |
| [`src/lib/components/ArticleCard.svelte`](../src/lib/components/ArticleCard.svelte) | 記事カード | 基礎版と同じ用途（Front-matter 対応版） |
| [`src/routes/+layout.svelte`](../src/routes/+layout.svelte) | 全体レイアウト | Navigation / Footer / `{@render children?.()}` |
| [`src/routes/+page.svelte`](../src/routes/+page.svelte) | ホームページ | 最新記事の表示 |
| [`src/routes/blog/[slug]/+page.svelte`](../src/routes/blog/[slug]/+page.svelte)<br>[`src/routes/blog/[slug]/+page.ts`](../src/routes/blog/[slug]/+page.ts) | 個別記事 | 動的ルート、Prism.js ハイライトの出力を `{@html}` で表示 |
| [`src/routes/about/+page.svelte`](../src/routes/about/+page.svelte) | About ページ | 静的ページの例 |
| `src/app.html` / `src/app.css` | HTML テンプレート / グローバル CSS | — |

## 基礎版との差分マップ

本サンプルで**新しく登場する概念**と該当ファイルです。

| 新概念 | 該当ファイル | なぜ必要か |
|--------|------------|-----------|
| Vite `import.meta.glob` | [`src/lib/data/articles.ts`](../src/lib/data/articles.ts) | Markdown ファイル群をビルド時に静的インポートするため |
| Front-matter | [`src/lib/utils/markdown.ts`](../src/lib/utils/markdown.ts) | 記事本文とメタデータを YAML ヘッダで分離するため |
| MiniSearch 全文検索 | [`src/lib/utils/search.ts`](../src/lib/utils/search.ts) | クライアントサイドで軽量な全文検索を実現するため |
| デバウンス処理 | [`src/lib/components/SearchBox.svelte`](../src/lib/components/SearchBox.svelte) | 入力のたびに検索を走らせず、停止後に一度だけ実行するため |
| Prism.js ハイライト | [`src/lib/utils/markdown.ts`](../src/lib/utils/markdown.ts)（`marked-highlight` 連携） | コードブロックのシンタックスハイライト |
| タグ集計（`Map<string, number>`） | [`src/lib/components/TagCloud.svelte`](../src/lib/components/TagCloud.svelte) | タグの出現回数を視覚化するため |

## 学習サイトの関連章

より深く理解するための関連章です。

| 概念 | 学習サイトの章 |
|------|-------------|
| Runes（`$state` / `$derived` / `$props`） | [Svelte / Runes](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/svelte/runes/) |
| イベントハンドラ（`oninput` など） | [Svelte / Basics / テンプレート構文](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/svelte/basics/template-syntax/) |
| Snippets と `{@render}` | [Svelte / Advanced / Snippets](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/svelte/advanced/snippets/) |
| レンダリング戦略（SSG / prerender） | [SvelteKit / 基礎 / レンダリング戦略](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/sveltekit/basics/rendering-strategies/) |
| 動的ルート | [SvelteKit / ルーティング / 動的](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/sveltekit/routing/dynamic/) |
| Load 関数 | [SvelteKit / データ取得 / Load 関数](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/sveltekit/data-loading/basic/) |

## 次のステップ（他サンプル）

本サンプルを読み終えたら、以下の方向に進めます。

| 方向 | サンプル | 追加で学べること |
|------|---------|---------------|
| 状態管理を深める | [svelte5-todo-example](https://github.com/shuji-bonji/svelte5-todo-example) | `.svelte.ts` を使った状態管理、クラスベースストア |
| 認証・セッションを扱う | [svelte5-auth-basic](https://github.com/shuji-bonji/svelte5-auth-basic) | Cookie/Session 認証、フォームアクション、hooks |
| トークン認証を学ぶ | [svelte5-auth-jwt](https://github.com/shuji-bonji/svelte5-auth-jwt) | JWT、トークン管理 |
