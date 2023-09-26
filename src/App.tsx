import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Sidebar from "./components/sidebar/Sidebar"
import { useState } from "react";
import Leaderboard from "./pages/Leaderboard";
import SavedStory from "./pages/SavedStory";
import Signup from "./pages/Signup";
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-gradient-radial bg-fixed h-screen overflow-y-hidden">
      <Router>
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="flex">
          <Sidebar isMenuOpen={isMenuOpen} />
          <div className="h-screen overflow-y-auto pb-12 w-full" >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/saved" element={<SavedStory />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/auth/signup" element={<Signup/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </div >
  )
}

export default App
