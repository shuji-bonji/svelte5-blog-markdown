export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  published?: boolean;
  featured?: boolean;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  html?: string;
  readingTime?: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export interface SearchableArticle extends Article {
  id: string;
  searchableText: string;
}