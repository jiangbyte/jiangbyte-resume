import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// 简历子站：resume.jiangbyte.cn；根域博客仍由 code-guide 承载
export default defineConfig({
  site: 'https://resume.jiangbyte.cn',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
