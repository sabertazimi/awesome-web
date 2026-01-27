import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src',
  basename: import.meta.env.PROD ? '/m-league-reviewer/' : '/',
  ssr: false,
  async prerender() {
    return ['/', '/players']
  },
} satisfies Config
