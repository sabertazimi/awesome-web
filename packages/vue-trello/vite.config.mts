import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/vue-trello/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
}))
