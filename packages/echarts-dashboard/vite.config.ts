import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue(), tailwindcss()],
  base: mode === 'production' ? '/echarts-dashboard/' : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}))
