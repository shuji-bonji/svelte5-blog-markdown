<svelte:head>
  <title>About - Markdown Blog</title>
  <meta name="description" content="Markdownベースのブログシステムについて" />
</svelte:head>

<div class="container about">
  <h1>About Markdown Blog</h1>
  
  <section>
    <h2>このブログシステムについて</h2>
    <p>
      Markdown Blogは、開発者のために設計されたブログシステムです。
      記事をMarkdownファイルとして管理し、Gitでバージョン管理できます。
    </p>
  </section>
  
  <section>
    <h2>主な機能</h2>
    <ul>
      <li>📝 Markdownファイルによる記事管理</li>
      <li>🔍 MiniSearchによる高速全文検索</li>
      <li>🏷️ タグシステムとフィルタリング</li>
      <li>⚡ Viteによる高速ビルド</li>
      <li>🎨 シンタックスハイライト対応</li>
      <li>📱 レスポンシブデザイン</li>
    </ul>
  </section>
  
  <section>
    <h2>技術スタック</h2>
    <ul>
      <li>Svelte 5 - Runesシステムを活用</li>
      <li>SvelteKit - フルスタックフレームワーク</li>
      <li>TypeScript - 型安全な開発</li>
      <li>Marked - Markdownパーサー</li>
      <li>MiniSearch - 全文検索エンジン</li>
      <li>Prism.js - シンタックスハイライト</li>
    </ul>
  </section>
  
  <section>
    <h2>ソースコード</h2>
    <p>
      このブログシステムはオープンソースです。
      <a href="https://github.com/shuji-bonji/svelte5-blog-markdown" target="_blank" rel="noopener">
        GitHub
      </a>
      でソースコードを公開しています。
    </p>
  </section>
</div>

<style>
  .about {
    max-width: 800px;
    padding: 2rem 0;
  }
  
  h1 {
    margin-bottom: 3rem;
    text-align: center;
  }
  
  section {
    margin: 2rem 0;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
  }
  
  h2 {
    margin-bottom: 1rem;
    color: var(--color-primary);
  }
  
  p {
    line-height: 1.8;
    color: var(--color-text-light);
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 0.5rem 0;
    line-height: 1.8;
  }
  
  a {
    color: var(--color-primary);
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
</style>