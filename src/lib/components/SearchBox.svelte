<script lang="ts">
  import type { Article } from '$lib/types/blog';
  
  let { 
    onSearch,
    placeholder = '記事を検索...'
  }: {
    onSearch: (query: string) => void;
    placeholder?: string;
  } = $props();
  
  let query = $state('');
  let debounceTimer: NodeJS.Timeout;
  
  function handleInput() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 300);
  }
  
  function handleClear() {
    query = '';
    onSearch('');
  }
</script>

<div class="search-box">
  <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
  
  <input
    type="search"
    bind:value={query}
    oninput={handleInput}
    {placeholder}
    class="search-input"
  />
  
  {#if query}
    <button onclick={handleClear} class="clear-button" aria-label="検索をクリア">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  {/if}
</div>

<style>
  .search-box {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .search-input {
    width: 100%;
    padding: 0.875rem 3rem;
    font-size: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    background: white;
    transition: all 0.2s;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: #718096;
    stroke-width: 2;
  }
  
  .clear-button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    color: #718096;
    transition: color 0.2s;
  }
  
  .clear-button:hover {
    color: #4a5568;
  }
  
  .clear-button svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
  }
</style>