import React from 'react'
import './App.scss'
import Routes from './Routes'
import { useAuth } from './services/AuthService'

// TODO: window title and icon, installer icon
// TODO: make the pages responsive

function App() {
  useAuth()

  return <Routes />
}

export default App
