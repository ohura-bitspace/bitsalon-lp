import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // カスタムドメイン（bitsalon.bitspace.jp）のルートで配信するため '/' にする。
  // github.io のプロジェクトパス配下（/bitsalon-lp/）へ戻す場合は、ここと og:url を直す。
  base: '/',
  plugins: [react()],
});
