import path from 'path';
import { defineConfig } from 'vite';

const isEnvProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isEnvProduction ? '/awesome-web/vue-design/' : '/',
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
