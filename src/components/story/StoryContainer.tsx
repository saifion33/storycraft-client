import { MdHistoryEdu } from "react-icons/md"
import { IStory } from "../../Types"
import StoryCard from "./StoryCard"
import { useAppSelector } from "../../redux-hooks-type"
import { useNavigate } from "react-router-dom"
import DummyCard from "../DummyCard"

interface IProps {
    stories: IStory[] | null
    loading: boolean
}
type Badge = 'first' | 'second' | 'third' | null
const StoryContainer = ({ stories, loading }: IProps) => {
    const user = useAppSelector(state => state.auth.user)
    const navigate = useNavigate()

    const assignBadge = (index: number): Badge => {
        const badge: Badge[] = ['first', 'second', 'third']

        if (window.location.href.includes('/leaderboard')) {
                return badge[index] || null
        }
        return null
    }
    return (
        <div className="p-4 pb-14 min-h-full w-full">
            <div className="flex justify-center flex-wrap gap-4 ">
                {
                    (stories && !loading) && stories.map((story, index) => <StoryCard badge={assignBadge(index)} savedStories={user?.savedStories || null} story={story} key={story._id} />)
                }
                {
                    loading && [1, 2, 3].map(card => <DummyCard key={card} />)
                }
            </div>
            {
                (!loading && (!stories || stories.length <= 0)) && <div className="h-full flex flex-col justify-center items-center text-3xl text-stone-50 font-semibold">
                    <MdHistoryEdu onClick={() => navigate('/')} className="text-6xl text-stone-50 hover:text-slate-900 cursor-pointer" />
                    <p>No Stories</p>
                </div>
            }

        </div>
    )
}

export default StoryContainer