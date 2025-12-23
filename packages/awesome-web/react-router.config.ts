import type { Config } from '@react-router/dev/config'
import process from 'node:process'

const isVercel = Boolean(process.env.VERCEL)

export default {
  appDirectory: 'src',
  basename: import.meta.env.PROD && !isVercel ? '/awesome-web/' : '/',
  ssr: false,
  async prerender() {
    return ['/']
  },
} satisfies Config
