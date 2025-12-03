import CalendarView from '@/views/calendar-view'

export function meta() {
  return [{ title: 'M.League 复盘' }, { name: 'description', content: 'M.League 复盘工具' }]
}

export default function Home() {
  return <CalendarView />
}
