// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Feed from './pages/Feed'
import Watch from './pages/Watch'
import Upload from './pages/Upload'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:userId/feed" element={<Feed />} />
        <Route path="/:userId/watch/:videoId" element={<Watch />} />
        <Route path="/:userId/upload" element={<Upload />} />
        <Route path="/" element={<h1>Welcome to IIITA-flix</h1>} />
      </Routes>
    </Router>
  )
}f

export default App
