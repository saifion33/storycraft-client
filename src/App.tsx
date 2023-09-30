import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from "./components/sidebar/Sidebar"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer} from "react-toastify"
// import Leaderboard from "./pages/Leaderboard"
// import SavedStory from "./pages/SavedStory"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup"
import {Suspense,lazy} from 'react'
import Login from "./pages/Login"
import Story from './pages/Story'
import { useState } from "react"
import Home from "./pages/Home"
import Loading from './components/Loading'
const SavedStory =lazy(()=>import('./pages/SavedStory'))
const Leaderboard =lazy(()=>import('./pages/Leaderboard'))

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-gradient-radial bg-fixed h-screen overflow-y-hidden">
      <Router>
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="flex">
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className="h-screen overflow-y-auto pb-12 w-full" >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/saved" element={<Suspense fallback={<Loading/>} ><SavedStory /></Suspense>} />
              <Route path="/leaderboard" element={<Suspense fallback={<Loading/>} ><Leaderboard /></Suspense>} />
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
