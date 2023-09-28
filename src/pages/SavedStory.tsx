import { BiLogIn } from "react-icons/bi"
import { useAppSelector } from "../redux-hooks-type"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { IStory } from "../Types"
import { getSavedStoriesApi } from "../Api"
import { toast } from 'react-toastify'
import StoryContainer from "../components/story/StoryContainer"

const SavedStory = () => {

  const user = useAppSelector(state => state.auth.user)
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [savedStories, setSavedStories] = useState<IStory[] | null>(null)

  useEffect(() => {
    setLoading(true)
    getSavedStoriesApi()
      .then(res => setSavedStories(res.data.stories))
      .catch(err => {
        console.log(err);
        toast.info(err.response.data.message);
      })
      .finally(()=>setLoading(false));
  }, [])
  return (
    <div className="h-full">
      {
        !user && <div className="h-full flex flex-col justify-center items-center text-stone-50">
          <BiLogIn onClick={() => navigate('/auth/login')} className="text-5xl cursor-pointer hover:text-slate-900" />
          <p className="text-xl">Login to see saved stories</p>
        </div>
      }
     
      <StoryContainer loading={loading} stories={savedStories} />
    </div>
  )
}

export default SavedStory