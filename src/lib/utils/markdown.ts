import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import fm from 'front-matter';
import type Prism from 'prismjs';
import type { Article, ArticleFrontmatter } from '$lib/types/blog';

// Prism.jsを動的にインポート（クライアントサイドのみ）
let prism: typeof Prism | undefined;
if (typeof window !== 'undefined') {
  Promise.all([
    import('prismjs'),
    import('prismjs/components/prism-markup'),
    import('prismjs/components/prism-typescript'),
    import('prismjs/components/prism-javascript'),
    import('prismjs/components/prism-jsx'),
    import('prismjs/components/prism-tsx'),
    import('prismjs/components/prism-css'),
    import('prismjs/components/prism-json'),
    import('prismjs/components/prism-bash'),
    import('prismjs/components/prism-markdown'),
    import('prismjs/components/prism-yaml'),
    import('prismjs/components/prism-sql')
  ]).then(([prismModule]) => {
    prism = prismModule.default;
  });
}

// Markedの設定
marked.use(
  markedHighlight({
    langPrefix: 'language-',
    highlight(code, lang) {
      if (prism && prism.languages[lang]) {
        return prism.highlight(code, prism.languages[lang], lang);
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

/**
 * 本文先頭の「# タイトル」行が frontmatter の title と一致する場合に除去する。
 * これにより、ページ側の <h1> と本文冒頭の h1 の二重表示を防ぐ。
 * Markdown の執筆時は # を書いても書かなくても同じ結果になる。
 */
function stripLeadingH1(body: string, title: string): string {
  const lines = body.split('\n');
  // 先頭の空行をスキップ
  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i++;

  const firstLine = lines[i];
  if (!firstLine) return body;

  // ATX 形式の h1 (# ...) にマッチ。h2 以降 (##) は除外。
  const match = firstLine.match(/^#\s+(.+?)\s*#*\s*$/);
  if (!match) return body;

  if (match[1].trim() === title.trim()) {
    // # タイトル行とその直後の空行を除去
    return lines.slice(i + 1).join('\n').replace(/^\n+/, '');
  }
  return body;
}

export function parseMarkdown(slug: string, markdown: string): Article {
  const { attributes, body } = fm<ArticleFrontmatter>(markdown);
  // frontmatter に title がある場合、本文冒頭の重複 h1 を除去する
  const normalizedBody = stripLeadingH1(body, attributes.title);
  // marked v16: async オプションを明示して string を返すオーバーロードを選択する
  const html = marked.parse(normalizedBody, { async: false });
  const stats = calculateReadingTime(normalizedBody);
  
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