import { AiFillPlusCircle } from "react-icons/ai"
import PromptInput from "../components/PromptInput"
import StoryContainer from "../components/story/StoryContainer"
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../redux-hooks-type"
import { getAllStories } from "../redux/actions/story"


const Home = () => {
  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false)
  const { stories, loading } = useAppSelector(state => state.stories)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllStories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={`min-h-screen pb-12 ${stories&& stories.length>=4?'pb-28':''}  relative md:flex md:justify-center`}>
      <StoryContainer loading={loading} stories={stories} />
      <div className={`fixed  bottom-0 md:bottom-4 w-full max-w-[600px] sm:block ${isPromptOpen ? 'block' : 'hidden'}`}>
        <PromptInput closePrompt={() => setIsPromptOpen(false)} />
      </div>
      {!isPromptOpen && <AiFillPlusCircle role="button" onClick={() => setIsPromptOpen(true)} className="text-5xl z-50 bg-stone-50 md:hidden rounded-full fixed bottom-4 right-4" />}
    </div>
  )
}

export default Home