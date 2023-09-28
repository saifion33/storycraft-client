import { MdHistoryEdu } from "react-icons/md"
import { IStory } from "../../Types"
import Loading from "../Loading"
import StoryCard from "./StoryCard"
import { useAppSelector } from "../../redux-hooks-type"

interface IProps{
    stories:IStory[]|null
    loading:boolean
}
const StoryContainer = ({stories,loading}:IProps) => {
    const user=useAppSelector(state=>state.auth.user)
    return (
        <div className="p-4">
            <div className="flex justify-center flex-wrap gap-4 ">
                {
                  (stories && !loading ) && stories.map(story => <StoryCard savedStories={user?.savedStories || null} story={story} key={story._id} />)
                }
            </div>
            {
                loading && <Loading/>
            }
            {
                (!loading && !stories) && <div className="h-full flex flex-col justify-center items-center text-3xl text-stone-50 font-semibold">
                    <MdHistoryEdu className="text-6xl text-stone-50"/>
                    <p>No Stories</p>
                </div>
            }
        </div>
    )
}

export default StoryContainer