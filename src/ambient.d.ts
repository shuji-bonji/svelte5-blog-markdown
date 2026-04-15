// Prism.js の言語コンポーネントは副作用インポートのみ（言語定義を register するため）。
// @types/prismjs がサブパスの型を公開していないため ambient 宣言で補う。
// 注意: このファイルは module 扱いにしないため、import / export を書かないこと。
declare module 'prismjs/components/*';
