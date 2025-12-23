import { StrictMode } from 'react'
import App from '@/App'
import Renderer from '@/renderer'
import '@/assets/base.css'

Renderer.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
