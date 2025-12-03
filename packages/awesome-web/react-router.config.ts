import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src',
  basename: import.meta.env.PROD ? '/awesome-web/' : '/',
  ssr: false,
  async prerender() {
    return ['/']
  },
} satisfies Config
