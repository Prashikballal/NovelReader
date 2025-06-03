// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/NovelReader/',  // 👈 VERY IMPORTANT
  plugins: [react()],
});
