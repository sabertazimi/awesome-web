import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/m-league-reviewer/' : '/',
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  test: {
    environment: 'node',
  },
}))
