import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'

const isVercel = Boolean(process.env.VERCEL)

function getBase(mode: string) {
  if (mode !== 'production') {
    return '/'
  }

  return isVercel ? '/vue-design/' : '/lab/vue-design/'
}

export default defineConfig(({ mode }) => ({
  base: getBase(mode),
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
}))
