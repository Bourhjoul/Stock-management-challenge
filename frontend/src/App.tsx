import React, { useState } from 'react'
import './App.css'
import Login from './pages/LogIn'

function App() {
  const [Logged, setLogged] = useState(false)
  return (
    <div className="App">
      <Login />
    </div>
  )
}

export default App
