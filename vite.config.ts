import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// カスタムドメイン(biz.bitspace.jp)で配信するため base はデフォルトの '/' のままにする
export default defineConfig({
  plugins: [react()],
});
