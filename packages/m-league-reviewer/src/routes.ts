import type { RouteConfig } from '@react-router/dev/routes'
import { index, route } from '@react-router/dev/routes'

export default [index('routes/home.tsx'), route('players', 'routes/players.tsx')] satisfies RouteConfig
