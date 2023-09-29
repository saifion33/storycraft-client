import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { IStory } from "../Types"
import { getStoryByIdApi } from "../Api"
import { toast } from 'react-toastify'
import StoryCard from "../components/story/StoryCard"
import { useAppSelector } from "../redux-hooks-type"
import Topbar from "../components/Topbar"
import DummyCard from "../components/DummyCard"

const Story = () => {
    const { storyId } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [story, setStory] = useState<null | IStory>(null)
    const savedStories = useAppSelector(state => state.auth.user?.savedStories)
    console.log(storyId)
    useEffect(() => {
        if (storyId) {
            setLoading(true)
            getStoryByIdApi(storyId)
                .then(res => setStory(res.data.story))
                .catch(err => {
                    toast.info(err.response.data.message)
                })
                .finally(() => setLoading(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Topbar />
            <div className="flex justify-center items-center h-full">
                {!storyId && <div>Story Id not found.</div>}
                {loading && <DummyCard/>}
                {(!loading && story) && <StoryCard story={story} savedStories={savedStories || null} />}
            </div>
        </>
    )
}

export default Story