import MiniSearch from 'minisearch';
import type { Article, SearchableArticle } from '$lib/types/blog';

export function createSearchIndex(articles: Article[]) {
  const searchableArticles: SearchableArticle[] = articles.map(article => ({
    ...article,
    id: article.slug,
    searchableText: `${article.frontmatter.title} ${article.frontmatter.description} ${article.content}`
  }));
  
  const miniSearch = new MiniSearch<SearchableArticle>({
    fields: ['frontmatter.title', 'frontmatter.description', 'searchableText', 'frontmatter.tags'],
    storeFields: ['slug', 'frontmatter'],
    searchOptions: {
      boost: { 
        'frontmatter.title': 3,
        'frontmatter.tags': 2,
        'frontmatter.description': 1.5
      },
      fuzzy: 0.2,
      prefix: true
    }
  });
  
  miniSearch.addAll(searchableArticles);
  
  return miniSearch;
}

export function searchArticles(
  searchIndex: MiniSearch<SearchableArticle>,
  query: string
): Article[] {
  if (!query.trim()) return [];
  
  const results = searchIndex.search(query);
  
  return results.map(result => ({
    slug: result.slug,
    frontmatter: result.frontmatter,
    content: '', // 検索結果では本文は不要
    html: ''
  }));
}