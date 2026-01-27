import type { Config } from '@react-router/dev/config'
import process from 'node:process'

const isVercel = Boolean(process.env.VERCEL)

export default {
  appDirectory: 'src',
  basename: import.meta.env.PROD ? isVercel ? '/m-league-reviewer/' : '/lab/m-league-reviewer/' : '/',
  ssr: false,
  async prerender() {
    return ['/', '/players']
  },
} satisfies Config
