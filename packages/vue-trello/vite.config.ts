import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/awesome-web/vue-trello/',
  plugins: [vue()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
