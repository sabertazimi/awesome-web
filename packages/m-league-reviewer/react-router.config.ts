import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src',
  basename: import.meta.env.PROD ? '/awesome-web/m-league-reviewer/' : '/',
  ssr: false,
  async prerender() {
    return ['/', '/players']
  },
} satisfies Config
