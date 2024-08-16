import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PlayerProvider } from './contexts/PlayerContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <PlayerProvider>
    <App />
  </PlayerProvider>,
)
