# Svelte 5 Markdown Blog（発展版）

Svelte 5 と SvelteKit で、**Markdown ファイルを記事ソースとした本格的なブログシステム**を構築するサンプルです。
Vite の glob import、Front-matter、全文検索（MiniSearch）、タグクラウド、シンタックスハイライトを実装しています。

> 本リポジトリは [**TypeScriptで学ぶ Svelte 5/SvelteKit 学習ガイド**](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/) の教材サンプルです。
> コードの**解説は学習サイト側**に集約されています。本リポジトリは「動くコード」と「解説との対応表」を提供します。

- 📖 **学習サイト記事**: [Markdownベースのブログシステム](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/examples/markdown-blog/)
- 🌐 **デモサイト**: [https://shuji-bonji.github.io/svelte5-blog-markdown/](https://shuji-bonji.github.io/svelte5-blog-markdown/)
- 🗺️ **対応表（記事 ⇔ ファイル）**: [docs/learning-map.md](./docs/learning-map.md)

## このサンプルの位置付け

[svelte5-blog-example（基礎版）](https://github.com/shuji-bonji/svelte5-blog-example) を読み終えた次のステップとして、**実運用に近いブログ**を構築するためのサンプルです。基礎版との差分に学習ポイントを集中させています。

### 学べること

- ✅ Vite の `import.meta.glob` による Markdown ファイルの一括読み込み（ビルド時）
- ✅ Front-matter（`front-matter` パッケージ）によるメタデータ管理
- ✅ `marked` + `marked-highlight` + Prism.js によるシンタックスハイライト
- ✅ MiniSearch を使ったクライアントサイド全文検索
- ✅ タグクラウドと動的フィルタリング
- ✅ SSG（prerender）での制約（`url.searchParams` が使えない等）と回避策
- ✅ デバウンス処理による UX 改善
- ✅ 読了時間の自動計算

### 基礎版との差分

| 機能 | 基礎版 (`svelte5-blog-example`) | 本リポジトリ（発展版） |
|------|------|------|
| 記事データ | TS ファイルにハードコード | `content/posts/*.md` を glob import |
| メタデータ | TS オブジェクトで直書き | Front-matter |
| 検索 | — | MiniSearch 全文検索 + デバウンス |
| タグ | 記事内に表示のみ | タグクラウド + フィルタ |
| シンタックスハイライト | `marked` のみ | `marked-highlight` + Prism.js |
| 読了時間 | 手書き | 自動計算 |

基礎的なルーティング・レイアウト・Load 関数の理解は基礎版で済ませてから本サンプルに来ることを推奨します。

### 学べないこと（＝他サンプルの担当範囲）

| 学びたいこと | 該当サンプル |
|-------------|------------|
| SvelteKit の基礎（ルーティング・Load 関数・型） | [svelte5-blog-example](https://github.com/shuji-bonji/svelte5-blog-example) |
| 状態管理と `.svelte.ts` の活用 | [svelte5-todo-example](https://github.com/shuji-bonji/svelte5-todo-example) |
| Cookie/Session 認証 | [svelte5-auth-basic](https://github.com/shuji-bonji/svelte5-auth-basic) |
| JWT 認証 | [svelte5-auth-jwt](https://github.com/shuji-bonji/svelte5-auth-jwt) |

## 技術スタック

| 項目 | バージョン |
|------|-----------|
| Svelte | 5.38.x |
| SvelteKit | 2.37.x |
| TypeScript | 5.9.x |
| Vite | 7.1.x |
| Marked | 16.x |
| marked-highlight | 2.x |
| Prism.js | 1.30.x |
| front-matter | 4.x |
| MiniSearch | 7.x |
| adapter-static | 3.x |

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 型チェック
npm run check

# ビルド（SSG）
npm run build

# ビルド成果物のプレビュー
npm run preview
```

Node.js 20.x LTS 以上を推奨します。

## 記事の追加

`content/posts/` ディレクトリに Markdown ファイルを追加するだけで、ビルド時に自動で記事一覧・検索インデックス・タグクラウドに反映されます。

### ファイル名の命名規則

```
YYYY-MM-DD-slug-name.md
```

例: `2025-01-08-markdown-powered-blog.md`

### Front-matter の書式

```markdown
---
title: 記事のタイトル
description: 記事の概要説明（検索対象）
date: 2025-01-08
author: 著者名
tags: [Svelte 5, TypeScript, Markdown]
published: true
featured: false
---

記事の本文（Markdown）...
```

`published: false` にするとビルド対象から除外されます。

## プロジェクト構成

```
svelte5-blog-markdown/
├── content/
│   └── posts/                    # Markdown 記事（glob import 対象）
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ArticleCard.svelte
│   │   │   ├── SearchBox.svelte  # デバウンス付き検索入力
│   │   │   └── TagCloud.svelte   # タグクラウド
│   │   ├── data/
│   │   │   └── articles.ts       # glob import + 公開フィルタ
│   │   ├── utils/
│   │   │   ├── markdown.ts       # Front-matter + marked
│   │   │   └── search.ts         # MiniSearch インデックス
│   │   └── types/
│   │       └── blog.ts           # 型定義（Article / Frontmatter / Searchable）
│   └── routes/
│       ├── +layout.svelte        # 全体レイアウト
│       ├── +layout.ts            # prerender = true
│       ├── +page.svelte          # ホームページ
│       ├── about/
│       │   └── +page.svelte
│       └── blog/
│           ├── +page.svelte      # 記事一覧（検索・タグ統合）
│           └── [slug]/
│               ├── +page.svelte  # 個別記事
│               └── +page.ts      # 動的ルートの Load
└── static/
    └── favicon.svg
```

各ファイルが学習サイトのどの章に対応するかは [docs/learning-map.md](./docs/learning-map.md) を参照してください。

## 学習の進め方（推奨）

1. 基礎版 [svelte5-blog-example](https://github.com/shuji-bonji/svelte5-blog-example) を先に読む
2. 学習サイトの [Markdownベースのブログシステム](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/examples/markdown-blog/) を読む
3. [docs/learning-map.md](./docs/learning-map.md) で記事の章と本リポジトリのファイルを突き合わせる
4. `npm run dev` で動かしながらコードを読む
5. `content/posts/` に自分の記事を追加して挙動を確認する

## 静的サイト生成（SSG）の注意点

本サンプルは `adapter-static` による完全な SSG です。以下の制約があります。

- `url.searchParams` はビルド時に評価できないため、**タグフィルタなどはクライアントサイドの `$state`** で管理
- 個別記事ページは `entries()` によるエントリー列挙、または動的ルートのプリレンダリングで全記事を静的生成

## デプロイ

`adapter-static` による静的サイト生成で、GitHub Pages に自動デプロイされます。main ブランチへの push でビルド・公開されます。

## 関連リンク

- [TypeScriptで学ぶ Svelte 5/SvelteKit 学習ガイド](https://shuji-bonji.github.io/Svelte-and-SvelteKit-with-TypeScript/)
- [Svelte 公式ドキュメント](https://svelte.dev/docs)
- [SvelteKit 公式ドキュメント](https://kit.svelte.dev/docs)
- [MiniSearch](https://github.com/lucaong/minisearch)
- [marked](https://marked.js.org/)
- [Prism.js](https://prismjs.com/)

## ライセンス

MIT
