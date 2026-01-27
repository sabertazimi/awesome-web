import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const isVercel = Boolean(process.env.VERCEL)

function getBase(mode: string) {
  if (mode !== 'production') {
    return '/'
  }

  return isVercel ? '/react-renderer/' : '/lab/react-renderer/'
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: getBase(mode),
  plugins: [tailwindcss(), react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      exclude: ['src/components/ui/*.tsx'],
    },
  },
}))
