---
title: Svelte 5の新機能まとめ
description: Runesシステム、Snippets、改善されたTypeScriptサポートなど、Svelte 5の主要な新機能を解説
date: 2025-01-07
author: 鈴木花子
tags: [Svelte 5, Runes, TypeScript, フロントエンド]
published: true
featured: false
---

# Svelte 5の新機能まとめ

Svelte 5では、開発体験を大幅に向上させる多くの新機能が導入されました。

## Runesシステム

最も重要な変更は、新しいリアクティビティシステム「Runes」の導入です。

### $state - リアクティブな状態

```typescript
let count = $state(0);
let user = $state({
  name: '太郎',
  age: 25
});
```

### $derived - 派生値

```typescript
let doubled = $derived(count * 2);
let fullName = $derived(`${user.name} (${user.age}歳)`);
```

### $effect - 副作用

```typescript
$effect(() => {
  console.log(`Count changed to: ${count}`);
  
  // クリーンアップ
  return () => {
    console.log('Cleaning up...');
  };
});
```

## Snippetsパターン

Svelte 5では、`<slot />`の代わりにSnippetsを使用します。

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  
  let { children }: { children?: Snippet } = $props();
</script>

<div class="container">
  {@render children?.()}
</div>
```

## 改善されたTypeScriptサポート

型推論が大幅に改善され、より型安全なコードが書けるようになりました。

```typescript
// Propsの型定義
type Props = {
  title: string;
  count?: number;
  onUpdate?: (value: number) => void;
};

let { title, count = 0, onUpdate }: Props = $props();
```

## パフォーマンスの向上

- コンパイル時の最適化が強化
- バンドルサイズの削減
- ランタイムパフォーマンスの向上

## 移行ガイド

既存のSvelte 4プロジェクトからの移行は段階的に行えます：

1. `export let`を`$props()`に置き換え
2. `$:`を`$derived`に置き換え
3. リアクティブステートメントを`$effect`に変換

## まとめ

Svelte 5は、より直感的で型安全な開発体験を提供します。
特にRunesシステムにより、リアクティビティの仕組みがより明確になりました。