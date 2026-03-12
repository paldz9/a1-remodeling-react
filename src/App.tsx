import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Home1 from './pages/Home1'
import Home2 from './pages/Home2'
import HomeTailwind from './pages/HomeTailwind'
import Appointment from './pages/Appointment'
import Services from './pages/Services'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home1" element={<Home1 />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/home-tailwind" element={<HomeTailwind />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </Router>
  )
}

export default App
