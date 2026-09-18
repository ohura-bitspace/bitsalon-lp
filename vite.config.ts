import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages のプロジェクトサイト配下でアセットを参照する。
  // 将来カスタムドメインに移行する際は '/'に変更する。
  base: '/bitsalon-lp/',
  plugins: [react()],
});
