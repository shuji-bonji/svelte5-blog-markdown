<script lang="ts">
  import { articles, getAllTags } from '$lib/data/articles';
  import { createSearchIndex, searchArticles } from '$lib/utils/search';
  import { getArticlesByTag } from '$lib/utils/markdown';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import SearchBox from '$lib/components/SearchBox.svelte';
  import TagCloud from '$lib/components/TagCloud.svelte';
  // 検索インデックスを作成
  const searchIndex = createSearchIndex(articles);
  const allTags = getAllTags();
  
  let searchQuery = $state('');
  let searchResults = $state<typeof articles>([]);
  let isSearching = $state(false);
  let selectedTag = $state<string | null>(null);
  
  // 表示する記事を決定
  let displayArticles = $derived(
    isSearching && searchQuery
      ? searchResults
      : selectedTag
      ? getArticlesByTag(articles, selectedTag)
      : articles
  );
  
  function handleSearch(query: string) {
    searchQuery = query;
    if (query) {
      isSearching = true;
      searchResults = searchArticles(searchIndex, query);
    } else {
      isSearching = false;
      searchResults = [];
    }
  }
</script>

<svelte:head>
  <title>ブログ記事一覧 - Markdown Blog</title>
  <meta name="description" content="Svelte 5、TypeScript、Markdownに関する技術記事を公開しています" />
</svelte:head>

<div class="container">
  <div class="page-header">
    <h1>ブログ記事</h1>
    <p class="subtitle">技術記事とチュートリアル</p>
  </div>
  
  <div class="search-section">
    <SearchBox onSearch={handleSearch} />
  </div>
  
  <div class="content-layout">
    <aside class="sidebar">
      <TagCloud tags={allTags} {selectedTag} onTagSelect={(tag) => selectedTag = tag} />
      
      <div class="stats">
        <h3>統計</h3>
        <dl>
          <dt>総記事数</dt>
          <dd>{articles.length}件</dd>
          <dt>タグ数</dt>
          <dd>{allTags.size}個</dd>
        </dl>
      </div>
    </aside>
    
    <div class="articles-section">
      {#if isSearching && searchQuery}
        <div class="search-info">
          「{searchQuery}」の検索結果: {searchResults.length}件
        </div>
      {/if}
      
      {#if selectedTag}
        <div class="tag-info">
          タグ「{selectedTag}」の記事: {displayArticles.length}件
          <button onclick={() => selectedTag = null} class="clear-filter">× フィルターをクリア</button>
        </div>
      {/if}
      
      <div class="articles-grid">
        {#each displayArticles as article}
          <ArticleCard {article} />
        {/each}
      </div>
      
      {#if displayArticles.length === 0}
        <div class="no-results">
          {#if isSearching}
            <p>検索結果が見つかりませんでした。</p>
            <p>別のキーワードで検索してみてください。</p>
          {:else}
            <p>記事が見つかりませんでした。</p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .page-header h1 {
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: var(--color-text-light);
    font-size: 1.125rem;
  }
  
  .search-section {
    margin-bottom: 3rem;
  }
  
  .content-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    align-items: start;
  }
  
  .sidebar {
    position: sticky;
    top: 100px;
  }
  
  .stats {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 2rem;
    box-shadow: var(--shadow-sm);
  }
  
  .stats h3 {
    margin: 0 0 1rem;
    font-size: 1.125rem;
  }
  
  .stats dl {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
  }
  
  .stats dt {
    color: var(--color-text-light);
  }
  
  .stats dd {
    font-weight: 600;
    text-align: right;
  }
  
  .search-info,
  .tag-info {
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow-sm);
  }
  
  .clear-filter {
    color: var(--color-text-muted);
    text-decoration: none;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    transition: all 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
  }
  
  .clear-filter:hover {
    background: var(--color-bg);
    color: var(--color-text);
  }
  
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .no-results {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--color-text-light);
  }
  
  @media (max-width: 768px) {
    .content-layout {
      grid-template-columns: 1fr;
    }
    
    .sidebar {
      position: static;
    }
  }
</style>