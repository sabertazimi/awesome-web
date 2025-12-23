import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

const isVercel = Boolean(process.env.VERCEL)

function getBase(mode: string) {
  if (mode !== 'production') {
    return '/'
  }

  return isVercel ? '/mortal-ui/' : '/awesome-web/mortal-ui/'
}

export default defineConfig(({ mode }) => ({
  base: getBase(mode),
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          element: ['element-plus'],
        },
      },
    },
  },
}))
