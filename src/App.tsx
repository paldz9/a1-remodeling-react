import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Home1 from './pages/Home1'
import Home2 from './pages/Home2'
import Appointment from './pages/Appointment'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <Link to="/">Home (Main)</Link>
          <Link to="/home1">Home 1</Link>
          <Link to="/home2">Home 2</Link>
          <Link to="/appointment">Appointment</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home1" element={<Home1 />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
