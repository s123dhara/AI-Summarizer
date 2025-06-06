import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SamarizeLanding from './SamarizeLanding'
import SamarizeChatApp from './SamarizeChatApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SamarizeLanding />} />
        <Route path="/generate" element={<SamarizeChatApp />} />
      </Routes>
    </Router>
  )
}

export default App
