import path from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const isVercel = Boolean(process.env.VERCEL)

function getBase(mode: string) {
  if (mode !== 'production') {
    return '/'
  }

  return isVercel ? '/vue-trello/' : '/lab/vue-trello/'
}

export default defineConfig(({ mode }) => ({
  base: getBase(mode),
  plugins: [vue()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
}))
