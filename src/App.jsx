import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landing/LandingPage'
import EnterPage from './pages/enter/EnterPage'
import GameRoom from './pages/game/GameRoom'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/enter" element={<EnterPage />} />
          <Route path="/game/:roomId" element={<GameRoom />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
