import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from "./components/sidebar/Sidebar"
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer} from "react-toastify"
import Loading from './components/Loading'
import Navbar from "./components/Navbar"
import {Suspense,lazy} from 'react'
import { useState } from "react"
import Home from "./pages/Home"

const Signup =lazy(()=>import('./pages/Signup'))
const Login =lazy(()=>import('./pages/Login'))
const SavedStory =lazy(()=>import('./pages/SavedStory'))
const Leaderboard =lazy(()=>import('./pages/Leaderboard'))
const Story =lazy(()=>import('./pages/Story'))



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
              <Route path="/auth/signup" element={<Suspense fallback={<Loading/>}><Signup/></Suspense>} />
              <Route path="/auth/login" element={<Suspense fallback={<Loading/>}><Login/></Suspense>} />
              <Route path='/story/:storyId' element={<Suspense fallback={<Loading/>}><Story/></Suspense>}/>
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer autoClose={3500} draggable closeButton position="top-center" theme="colored" newestOnTop={false} hideProgressBar={false} />
    </div >
  )
}

export default App
