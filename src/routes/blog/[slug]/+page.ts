import type { PageLoad } from './$types';
import { getArticle } from '$lib/data/articles';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const article = getArticle(params.slug);
  
  if (!article) {
    error(404, {
      message: '記事が見つかりませんでした'
    });
  }
  
  return {
    article
  };
};