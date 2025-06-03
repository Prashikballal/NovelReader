// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/NovelReader/',
  plugins: [react()],
  build: {
    outDir: 'docs', // <== THIS is key
  },
});
