import process from 'node:process'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const isVercel = Boolean(process.env.VERCEL)

function getBase(mode: string) {
  if (mode !== 'production') {
    return '/'
  }

  return isVercel ? '/m-league-reviewer/' : '/lab/m-league-reviewer/'
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: getBase(mode),
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  test: {
    environment: 'node',
  },
}))
