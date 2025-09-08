# Svelte 5 Markdown Blog

Markdownファイルで記事を管理する、開発者のためのSvelte 5ブログシステムです。

## デモサイト

[https://shuji-bonji.github.io/svelte5-blog-markdown/](https://shuji-bonji.github.io/svelte5-blog-markdown/)

## 特徴

- 📝 **Markdownベースの記事管理**: Gitでバージョン管理可能
- 🔍 **全文検索**: MiniSearchによる高速なクライアントサイド検索
- 🏷️ **タグシステム**: タグによる記事のフィルタリング
- ⚡ **高速ビルド**: Viteのglob importで自動的に記事を読み込み
- 🎨 **シンタックスハイライト**: Prism.jsによるコードハイライト
- 📱 **レスポンシブデザイン**: モバイル対応
- 🚀 **静的サイト生成**: GitHub Pagesでホスティング可能

## 技術スタック

- **Svelte 5**: Runesシステムを活用
- **SvelteKit**: ファイルベースルーティング
- **TypeScript**: 型安全な開発
- **Marked**: Markdownパーサー
- **MiniSearch**: 全文検索エンジン
- **Prism.js**: シンタックスハイライト

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 記事の追加

`content/posts/`ディレクトリにMarkdownファイルを追加します。

ファイル名形式: `YYYY-MM-DD-slug-name.md`

```markdown
---
title: 記事のタイトル
description: 記事の説明
date: 2025-01-08
author: 著者名
tags: [タグ1, タグ2]
published: true
featured: false
---

記事の本文...
```

## プロジェクト構成

```
content/
  posts/           # Markdown記事
src/
  lib/
    components/    # UIコンポーネント
    data/         # 記事データ管理
    utils/        # ユーティリティ
    types/        # TypeScript型定義
  routes/         # ページとルーティング
```

## デプロイ

GitHub Pagesへの自動デプロイが設定されています。mainブランチへのプッシュで自動的にビルド・デプロイされます。

## ライセンス

MIT