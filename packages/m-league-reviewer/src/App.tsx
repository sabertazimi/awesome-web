import { BrowserRouter, Route, Routes } from 'react-router'
import CalendarView from '@/pages/calendar-view'
import PlayersView from '@/pages/players-view'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/players" element={<PlayersView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
