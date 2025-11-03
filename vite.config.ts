import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
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
});
