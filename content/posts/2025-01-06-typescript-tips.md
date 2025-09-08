---
title: SvelteKitで役立つTypeScriptテクニック
description: SvelteKitプロジェクトで使える実践的なTypeScriptのテクニックとパターンを紹介
date: 2025-01-06
author: 佐藤次郎
tags: [TypeScript, SvelteKit, Tips, ベストプラクティス]
published: true
featured: false
---

# SvelteKitで役立つTypeScriptテクニック

SvelteKitとTypeScriptを組み合わせることで、型安全で保守性の高いアプリケーションを構築できます。

## 自動生成される型の活用

SvelteKitは`./$types`から自動的に型を生成します。

```typescript
// +page.svelte
import type { PageData } from './$types';

let { data }: { data: PageData } = $props();
```

```typescript
// +page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const response = await fetch(`/api/posts/${params.slug}`);
  const post = await response.json();
  
  return {
    post
  };
};
```

## ジェネリクスを使った再利用可能なコンポーネント

```typescript
// List.svelte
<script lang="ts" generics="T">
  type Props<T> = {
    items: T[];
    renderItem: (item: T) => string;
    getKey?: (item: T) => string | number;
  };
  
  let { items, renderItem, getKey }: Props<T> = $props();
</script>

{#each items as item (getKey ? getKey(item) : item)}
  <div>{renderItem(item)}</div>
{/each}
```

## Result型でエラーハンドリング

```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchData<T>(url: string): Promise<Result<T>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// 使用例
const result = await fetchData<Post>('/api/posts/1');
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

## Zodによるランタイム型検証

```typescript
import { z } from 'zod';

const PostSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  content: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  publishedAt: z.string().datetime()
});

type Post = z.infer<typeof PostSchema>;

// APIレスポンスの検証
function validatePost(data: unknown): Post {
  return PostSchema.parse(data);
}
```

## カスタムストアの型定義

```typescript
// counter.svelte.ts
export function createCounter(initial = 0) {
  let count = $state(initial);
  
  return {
    get value() { return count; },
    increment() { count++; },
    decrement() { count--; },
    reset() { count = initial; },
    set(value: number) { count = value; }
  };
}

export type Counter = ReturnType<typeof createCounter>;
```

## 型安全なフォーム処理

```typescript
// +page.server.ts
import type { Actions } from './$types';

export const actions = {
  createPost: async ({ request }) => {
    const formData = await request.formData();
    
    const title = formData.get('title');
    const content = formData.get('content');
    
    // 型ガード
    if (typeof title !== 'string' || typeof content !== 'string') {
      return {
        success: false,
        errors: { message: 'Invalid form data' }
      };
    }
    
    // 処理...
    
    return {
      success: true,
      post: { title, content }
    };
  }
} satisfies Actions;
```

## まとめ

TypeScriptを効果的に活用することで、SvelteKitアプリケーションの品質と開発効率を大幅に向上させることができます。
型安全性を保ちながら、柔軟で保守しやすいコードを書くことを心がけましょう。