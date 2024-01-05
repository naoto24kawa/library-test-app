import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'

// root element
const root = createRoot(
  document.getElementById('app') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
