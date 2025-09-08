<script lang="ts">
  import { articles, getFeaturedArticles } from '$lib/data/articles';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { base } from '$app/paths';
  
  const featuredArticles = getFeaturedArticles();
  const recentArticles = articles.slice(0, 3);
</script>

<svelte:head>
  <title>Markdown Blog - Svelte 5で作るブログシステム</title>
  <meta name="description" content="Markdownファイルで記事を管理し、全文検索とタグフィルタリングを実装したSvelte 5ブログシステム" />
</svelte:head>

<div class="container">
  <section class="hero">
    <h1 class="gradient-text">Markdown Blog</h1>
    <p class="subtitle">
      Markdownファイルで記事を管理する、開発者のためのブログシステム
    </p>
    <div class="features">
      <div class="feature">
        <span class="icon">📝</span>
        <span>Markdownベース</span>
      </div>
      <div class="feature">
        <span class="icon">🔍</span>
        <span>全文検索</span>
      </div>
      <div class="feature">
        <span class="icon">🏷️</span>
        <span>タグシステム</span>
      </div>
      <div class="feature">
        <span class="icon">⚡</span>
        <span>高速ビルド</span>
      </div>
    </div>
  </section>
  
  {#if featuredArticles.length > 0}
    <section class="featured">
      <h2>注目の記事</h2>
      <div class="articles-grid">
        {#each featuredArticles as article}
          <ArticleCard {article} />
        {/each}
      </div>
    </section>
  {/if}
  
  <section class="recent">
    <h2>最新の記事</h2>
    <div class="articles-grid">
      {#each recentArticles as article}
        <ArticleCard {article} />
      {/each}
    </div>
    <div class="more">
      <a href="{base}/blog" class="button">
        すべての記事を見る →
      </a>
    </div>
  </section>
</div>

<style>
  .hero {
    text-align: center;
    padding: 4rem 0;
  }
  
  .hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
  
  .subtitle {
    font-size: 1.25rem;
    color: var(--color-text-light);
    margin-bottom: 3rem;
  }
  
  .features {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: white;
    border-radius: 30px;
    box-shadow: var(--shadow-sm);
  }
  
  .icon {
    font-size: 1.5rem;
  }
  
  section {
    margin: 4rem 0;
  }
  
  h2 {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .more {
    text-align: center;
    margin-top: 3rem;
  }
  
  .button {
    display: inline-block;
    padding: 0.875rem 2rem;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    color: white;
    text-decoration: none;
    border-radius: 30px;
    font-weight: 600;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2.5rem;
    }
    
    .features {
      gap: 1rem;
    }
    
    .feature {
      font-size: 0.875rem;
    }
  }
</style>