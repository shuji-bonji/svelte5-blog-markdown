import type { Article } from '$lib/types/blog';
import { parseMarkdown, getSlugFromPath, sortArticlesByDate, filterPublishedArticles } from '$lib/utils/markdown';

// すべてのMarkdownファイルをインポート
const markdownFiles = import.meta.glob('/content/posts/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

// 記事をパースして配列に変換
const allArticles: Article[] = Object.entries(markdownFiles).map(([path, content]) => {
  const slug = getSlugFromPath(path);
  return parseMarkdown(slug, content as string);
});

// 公開記事のみ取得し、日付順にソート
export const articles = sortArticlesByDate(filterPublishedArticles(allArticles));

// 個別記事を取得
export function getArticle(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

// すべてのタグを取得（カウント付き）
export function getAllTags(): Map<string, number> {
  const tagCounts = new Map<string, number>();
  
  articles.forEach(article => {
    article.frontmatter.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return tagCounts;
}

// Featured記事を取得
export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.frontmatter.featured === true);
}

// 関連記事を取得（同じタグを持つ記事）
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const tags = article.frontmatter.tags;
  
  return articles
    .filter(a => a.slug !== article.slug)
    .map(a => ({
      article: a,
      score: a.frontmatter.tags.filter(tag => tags.includes(tag)).length
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article }) => article);
}