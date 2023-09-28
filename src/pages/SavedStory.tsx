import { BiLogIn } from "react-icons/bi"
import { useAppSelector } from "../redux-hooks-type"
import { useNavigate } from "react-router-dom"
import { MdHistoryEdu } from "react-icons/md"

const SavedStory = () => {

  const user=useAppSelector(state=>state.auth.user)
  const navigate=useNavigate()
  return (
    <div className="h-full">
      {
        !user && <div  className="h-full flex flex-col justify-center items-center text-stone-50">
          <BiLogIn onClick={()=>navigate('/auth/login')} className="text-5xl cursor-pointer hover:text-slate-900"/>
          <p className="text-xl">Login to see saved stories</p>
        </div>
      }
      {
        (user && (!user.savedStories || user.savedStories.length<=0)) && <div className="h-full flex flex-col justify-center items-center text-stone-50">
          <MdHistoryEdu onClick={()=>navigate('/')} className="text-5xl cursor-pointer hover:text-slate-900"/>
          <p className="text-xl">No saved stories</p>
        </div>
      }
    </div>
  )
}

export default SavedStory