import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import fm from 'front-matter';
import type { Article, ArticleFrontmatter } from '$lib/types/blog';

// Prism.jsを動的にインポート（クライアントサイドのみ）
let Prism: any;
if (typeof window !== 'undefined') {
  import('prismjs').then(module => {
    Prism = module.default;
  });
}

// Markedの設定
marked.use(
  markedHighlight({
    langPrefix: 'language-',
    highlight(code, lang) {
      if (Prism && Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], lang);
      }
      return code;
    }
  })
);

// 簡易的な読了時間計算
function calculateReadingTime(text: string) {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return {
    text: `${minutes}分で読めます`,
    minutes,
    time: minutes * 60 * 1000,
    words: wordCount
  };
}

export function parseMarkdown(slug: string, markdown: string): Article {
  const { attributes, body } = fm<ArticleFrontmatter>(markdown);
  const html = marked(body);
  const stats = calculateReadingTime(body);
  
  return {
    slug,
    frontmatter: attributes,
    content: body,
    html,
    readingTime: stats
  };
}

export function getSlugFromPath(path: string): string {
  // /content/posts/2024-01-15-my-post.md -> my-post
  const filename = path.split('/').pop() || '';
  const match = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
  return match ? match[1] : filename.replace('.md', '');
}

export function sortArticlesByDate(articles: Article[]): Article[] {
  return articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function filterPublishedArticles(articles: Article[]): Article[] {
  return articles.filter(article => 
    article.frontmatter.published !== false
  );
}

export function getArticlesByTag(articles: Article[], tag: string): Article[] {
  return articles.filter(article =>
    article.frontmatter.tags.includes(tag)
  );
}

export function getAllTags(articles: Article[]): Map<string, number> {
  const tagCounts = new Map<string, number>();
  
  articles.forEach(article => {
    article.frontmatter.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return tagCounts;
}