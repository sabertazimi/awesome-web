import PlayersView from '@/views/players-view'

export function meta() {
  return [{ title: 'M.League 复盘 | 选手图鉴' }, { name: 'description', content: 'M.League 复盘工具 | 选手图鉴' }]
}

export default function Players() {
  return <PlayersView />
}
