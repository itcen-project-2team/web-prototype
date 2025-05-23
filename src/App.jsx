import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landing/LandingPage'
import EnterPage from './pages/enter/EnterPage'
import GameRoom from './pages/game/GameRoom'
import MouseTrail from './components/MouseTrail'

function AppRoutes() {
  const location = useLocation();
  const isGameRoom = location.pathname.startsWith('/game/');

  return (
    <div className="app">
     {!isGameRoom && <MouseTrail />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/enter" element={<EnterPage />} />
        <Route path="/game/:roomId" element={<GameRoom />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App
