import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src',
  basename: '/',
  ssr: false,
  async prerender() {
    return ['/']
  },
} satisfies Config
