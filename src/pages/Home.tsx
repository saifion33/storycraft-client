import { AiFillPlusCircle } from "react-icons/ai"
import PromptInput from "../components/PromptInput"
import StoryContainer from "../components/story/StoryContainer"
import { useState } from 'react'

const Home = () => {
  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(true)
  return (
    <div className="min-h-screen pb-12 relative md:flex md:justify-center">
      <StoryContainer />
      {isPromptOpen && <div className="fixed bottom-0 md:bottom-4 w-full max-w-[600px] ">
        <PromptInput closePrompt={()=>setIsPromptOpen(false)} />
      </div>
      }
      {!isPromptOpen && <AiFillPlusCircle role="button" onClick={()=>setIsPromptOpen(true)} className="text-5xl z-50 bg-stone-50 md:hidden rounded-full fixed bottom-4 right-4" />}
    </div>
  )
}

export default Home