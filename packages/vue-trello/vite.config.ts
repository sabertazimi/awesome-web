import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const isEnvProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isEnvProduction ? '/awesome-web/vue-trello/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
