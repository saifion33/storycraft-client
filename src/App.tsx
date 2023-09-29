import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from "./components/sidebar/Sidebar"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer} from "react-toastify"
import Leaderboard from "./pages/Leaderboard"
import SavedStory from "./pages/SavedStory"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { useState } from "react"
import Home from "./pages/Home"
import Story from './pages/Story'

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
              <Route path="/auth/login" element={<Login/>} />
              <Route path='/story/:storyId' element={<Story/>}/>
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer autoClose={3500} draggable closeButton position="top-center" theme="colored" newestOnTop={false} hideProgressBar={false} />
    </div >
  )
}

export default App
