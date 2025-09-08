<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import type { Snippet } from 'svelte';
  
  let { children }: { children?: Snippet } = $props();
</script>

<div class="app">
  <header class="header">
    <nav class="nav container">
      <a href="{base}/" class="logo">
        <span class="gradient-text">Markdown Blog</span>
      </a>
      <ul class="nav-menu">
        <li><a href="{base}/">ホーム</a></li>
        <li><a href="{base}/blog">ブログ</a></li>
        <li><a href="{base}/about">About</a></li>
      </ul>
    </nav>
  </header>
  
  <main class="main">
    {@render children?.()}
  </main>
  
  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Markdown Blog. Built with Svelte 5 & SvelteKit.</p>
      <p>
        <a href="https://github.com/shuji-bonji/svelte5-blog-markdown" target="_blank" rel="noopener">
          GitHub
        </a>
      </p>
    </div>
  </footer>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    background: white;
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: var(--shadow-sm);
  }
  
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
  }
  
  .nav-menu {
    display: flex;
    gap: 2rem;
    list-style: none;
  }
  
  .nav-menu a {
    color: var(--color-text-light);
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .nav-menu a:hover {
    color: var(--color-primary);
  }
  
  .main {
    flex: 1;
    padding: 2rem 0;
  }
  
  .footer {
    background: white;
    border-top: 1px solid var(--color-border);
    padding: 2rem 0;
    text-align: center;
    color: var(--color-text-muted);
  }
  
  .footer a {
    color: var(--color-primary);
    text-decoration: none;
  }
  
  .footer a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .nav {
      flex-direction: column;
      gap: 1rem;
    }
    
    .nav-menu {
      gap: 1rem;
    }
  }
</style>