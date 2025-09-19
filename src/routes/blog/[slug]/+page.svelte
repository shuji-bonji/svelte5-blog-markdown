<script lang="ts">
  import type { PageData } from './$types';
  import { resolve } from '$app/paths';
  import { page } from '$app/stores';
  import { getRelatedArticles } from '$lib/data/articles';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  
  let { data }: { data: PageData } = $props();
  
  const relatedArticles = getRelatedArticles(data.article, 2);
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  }
</script>

<svelte:head>
  <title>{data.article.frontmatter.title} - Markdown Blog</title>
  <meta name="description" content={data.article.frontmatter.description} />
  <meta property="og:title" content={data.article.frontmatter.title} />
  <meta property="og:description" content={data.article.frontmatter.description} />
  <meta property="article:author" content={data.article.frontmatter.author} />
  <meta property="article:published_time" content={data.article.frontmatter.date} />
</svelte:head>

<article class="container article-container">
  <header class="article-header">
    <h1>{data.article.frontmatter.title}</h1>
    <p class="description">{data.article.frontmatter.description}</p>
    
    <div class="meta">
      <time datetime={data.article.frontmatter.date}>
        {formatDate(data.article.frontmatter.date)}
      </time>
      <span class="author">by {data.article.frontmatter.author}</span>
      {#if data.article.readingTime}
        <span class="reading-time">{data.article.readingTime.text}</span>
      {/if}
    </div>
    
    <div class="tags">
      {#each data.article.frontmatter.tags as tag}
        <a href="{resolve('/blog')}?tag={encodeURIComponent(tag)}" class="tag">
          {tag}
        </a>
      {/each}
    </div>
  </header>
  
  <div class="article-content">
    {@html data.article.html}
  </div>
  
  <footer class="article-footer">
    <div class="share">
      <h3>この記事をシェア</h3>
      <div class="share-buttons">
        <a 
          href="https://twitter.com/intent/tweet?text={encodeURIComponent(data.article.frontmatter.title)}&url={encodeURIComponent($page.url.href)}"
          target="_blank"
          rel="noopener"
          class="share-button twitter"
        >
          Twitter
        </a>
        <a 
          href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent($page.url.href)}"
          target="_blank"
          rel="noopener"
          class="share-button facebook"
        >
          Facebook
        </a>
      </div>
    </div>
    
    <nav class="article-nav">
      <a href={resolve('/blog')} class="back-link">
        ← ブログ一覧に戻る
      </a>
    </nav>
  </footer>
  
  {#if relatedArticles.length > 0}
    <section class="related">
      <h2>関連記事</h2>
      <div class="related-grid">
        {#each relatedArticles as article}
          <ArticleCard {article} />
        {/each}
      </div>
    </section>
  {/if}
</article>

<style>
  .article-container {
    max-width: 800px;
  }
  
  .article-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--color-border);
  }
  
  .article-header h1 {
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .description {
    font-size: 1.25rem;
    color: var(--color-text-light);
    margin-bottom: 1.5rem;
  }
  
  .meta {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    color: var(--color-text-muted);
    margin-bottom: 1rem;
  }
  
  .tags {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .tag {
    background: var(--color-bg);
    color: var(--color-text-light);
    padding: 0.375rem 1rem;
    border-radius: 20px;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  .tag:hover {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    color: white;
  }
  
  .article-footer {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 2px solid var(--color-border);
  }
  
  .share {
    margin-bottom: 2rem;
  }
  
  .share h3 {
    margin-bottom: 1rem;
  }
  
  .share-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .share-button {
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    color: white;
    font-weight: 500;
    transition: transform 0.2s;
  }
  
  .share-button:hover {
    transform: translateY(-2px);
  }
  
  .share-button.twitter {
    background: #1da1f2;
  }
  
  .share-button.facebook {
    background: #1877f2;
  }
  
  .article-nav {
    margin-top: 2rem;
  }
  
  .back-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  .related {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 2px solid var(--color-border);
  }
  
  .related h2 {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
</style>