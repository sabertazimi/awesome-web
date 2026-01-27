import process from 'node:process'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const isVercel = Boolean(process.env.VERCEL)

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' && !isVercel ? '/lab/' : '/',
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
}))
