import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import SamarizeLanding from './Pages/Landing/SamarizeLanding'
import SamarizeChatApp from './Pages/Chat/SamarizeChatApp'

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={ <SamarizeLanding /> } />
        <Route path="/generate" element={<SamarizeChatApp />} />
      </Routes>
    </Router>
  )
}

export default App
