import React from 'react'
import Renderer from './renderer'
import './index.css'
import App from './App'

Renderer.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
