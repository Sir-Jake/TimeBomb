import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { GameContextProvider } from './Context/GameContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </BrowserRouter>
  </StrictMode>,
)