<script lang="ts">
  import { base } from '$app/paths';
  
  let { 
    tags,
    selectedTag = null,
    onTagSelect
  }: {
    tags: Map<string, number>;
    selectedTag?: string | null;
    onTagSelect?: (tag: string | null) => void;
  } = $props();
  
  // タグのサイズを計算（記事数に応じて）
  function getTagSize(count: number): string {
    const maxCount = Math.max(...tags.values());
    const ratio = count / maxCount;
    
    if (ratio > 0.8) return 'xl';
    if (ratio > 0.6) return 'lg';
    if (ratio > 0.4) return 'md';
    if (ratio > 0.2) return 'sm';
    return 'xs';
  }
</script>

<div class="tag-cloud">
  <h3>タグ</h3>
  <div class="tags">
    <button 
      onclick={() => onTagSelect?.(null)}
      class="tag tag-all"
      class:selected={!selectedTag}
    >
      すべて
    </button>
    {#each [...tags.entries()] as [tag, count]}
      <button 
        onclick={() => onTagSelect?.(tag)}
        class="tag tag-{getTagSize(count)}"
        class:selected={selectedTag === tag}
        title="{count}件の記事"
      >
        {tag}
        <span class="count">{count}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .tag-cloud {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  h3 {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    color: #1a202c;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.875rem;
    background: #f7fafc;
    color: #4a5568;
    text-decoration: none;
    border-radius: 20px;
    transition: all 0.2s;
    border: 2px solid transparent;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
  }
  
  .tag:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
  }
  
  .tag.selected {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: transparent;
  }
  
  .tag-all {
    background: #edf2f7;
    font-weight: 500;
  }
  
  .count {
    font-size: 0.75rem;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.125rem 0.375rem;
    border-radius: 10px;
  }
  
  .tag.selected .count {
    background: rgba(255, 255, 255, 0.2);
  }
  
  /* タグサイズ */
  .tag-xs { font-size: 0.75rem; }
  .tag-sm { font-size: 0.875rem; }
  .tag-md { font-size: 1rem; }
  .tag-lg { font-size: 1.125rem; }
  .tag-xl { 
    font-size: 1.25rem;
    font-weight: 600;
  }
</style>