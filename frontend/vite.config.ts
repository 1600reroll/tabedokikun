import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 💡 Tailwindのプラグイン
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic' // React自動認識モード
    }),
    tailwindcss(), // 💡 ここでデザイン機能を合体させます！
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    }
  }
});