import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/client/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://staging-portal.kinolibrary.com',
        changeOrigin: true,
        secure: false, // keep false if the staging cert is not trusted
        // keep the path as-is (no rewrite), since you already call /api/...
      },
    },
  },
}));
