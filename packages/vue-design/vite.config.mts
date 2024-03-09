import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({mode}) => ({
  base: mode === 'production' ? '/awesome-web/vue-design/' : '/',
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
}));
