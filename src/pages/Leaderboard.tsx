import Topbar from "../components/Topbar"
import StoryContainer from "../components/story/StoryContainer"
import { useAppDispatch, useAppSelector } from "../redux-hooks-type"
import { getAllStories } from "../redux/actions/story"
import { useEffect } from 'react'

const Leaderboard = () => {
  const dispatch = useAppDispatch()
  const { loading, stories } = useAppSelector(state => state.stories)
  useEffect(() => {
    dispatch(getAllStories())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="h-screen">
      <Topbar name="Leaderboard" />
      {
        stories && <StoryContainer loading={loading} stories={[...stories].sort((a, b) => b.upVotes.length - a.upVotes.length)} />
      }
    </div>
  )
}

export default Leaderboard