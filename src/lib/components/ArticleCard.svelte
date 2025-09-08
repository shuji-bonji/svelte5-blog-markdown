<script lang="ts">
  import type { Article } from '$lib/types/blog';
  import { base } from '$app/paths';
  
  let { article }: { article: Article } = $props();
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<article class="card">
  <a href="{base}/blog/{article.slug}" class="card-link">
    {#if article.frontmatter.featured}
      <span class="featured-badge">Featured</span>
    {/if}
    
    <h2>{article.frontmatter.title}</h2>
    <p class="description">{article.frontmatter.description}</p>
    
    <div class="meta">
      <time datetime={article.frontmatter.date}>
        {formatDate(article.frontmatter.date)}
      </time>
      <span class="author">by {article.frontmatter.author}</span>
      {#if article.readingTime}
        <span class="reading-time">{article.readingTime.text}</span>
      {/if}
    </div>
    
    <div class="tags">
      {#each article.frontmatter.tags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
  </a>
</article>

<style>
  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .card-link {
    display: block;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
  }
  
  .featured-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  h2 {
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
    line-height: 1.3;
    color: #1a202c;
  }
  
  .description {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 0.875rem;
    color: #718096;
    margin-bottom: 1rem;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    background: #edf2f7;
    color: #4a5568;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    transition: all 0.2s;
  }
  
  .card:hover .tag {
    background: #e2e8f0;
  }
</style>