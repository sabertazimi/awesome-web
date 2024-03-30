import process from 'node:process'
import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const isEnvProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isEnvProduction ? '/awesome-web/vue-basis/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
