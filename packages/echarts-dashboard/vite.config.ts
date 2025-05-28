import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/echarts-dashboard/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
