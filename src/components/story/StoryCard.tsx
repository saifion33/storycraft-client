import {  BiSolidBadge } from "react-icons/bi"
import { useAppDispatch, useAppSelector } from "../../redux-hooks-type"
import { deleteStory, saveStory } from "../../redux/actions/story"
import { updateSaveStory } from "../../redux/slice/authSlice"
import { checkNetworkAndSession } from "../../utils/helpers"
import { BsChevronUp, BsChevronDown } from 'react-icons/bs'
import { upvote } from "../../redux/slice/storySlice"
import { useNavigate } from "react-router-dom"
import { upvoteStoryApi } from "../../Api"
import { toast } from 'react-toastify'
import copy from "copy-to-clipboard"
import { IStory } from "../../Types"
import { useState } from 'react'
import StoryCardFooter from "./StoryCardFooter"

interface IProps {
    story: IStory,
    savedStories: string[] | null,
    badge?: 'first' | 'second' | 'third' | null
}

const StoryCard = ({ story, savedStories, badge }: IProps) => {

    const deletingStoryId = useAppSelector(state => state.stories.deletingStoryId)
    const isSaved = savedStories && savedStories.includes(story._id);
    const user = useAppSelector(state => state.auth.user);
    const [isPromptOpen, setIsPromptOpen] = useState(false)
    const userId = user?._id
    const isUpvoted = userId && story.upVotes.includes(userId) || null;
    const isAuthor = story.author._id === userId;
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    //*********************** save story function ************************************************
    const saveStoryFunction = async (storyId: string) => {
        dispatch(updateSaveStory({ storyId }))
        const response = await dispatch(saveStory({ storyId }))
        if (saveStory.rejected.match(response)) {
            dispatch(updateSaveStory({ storyId }))
            toast.info(response.payload?.message)
        }
    }

    // ******************************* upvote story function *******************************
    const upvoteFunction = async (storyId: string, userId: string | null) => {
        if (userId) {
            dispatch(upvote({ storyId, userId }))
            upvoteStoryApi({ storyId })
                .catch((err) => {
                    toast.info(err.response.data.message)
                    dispatch(upvote({ storyId, userId }))
                })
        }
    }

    // ********************************* delete Story Function *******************************
    const deleteStoryFunction = async (storyId: string) => {
        const response = await dispatch(deleteStory({ storyId }))
        if (deleteStory.fulfilled.match(response)) {
            if (window.location.href.includes('story/')) {
                navigate('/')
            }
        }
        if (deleteStory.rejected.match(response)) {
            toast.info(response.payload?.message)
        }
    }

    // ************************************ share story function ********************************
    const handleShareStory = () => {
        const isCopy = copy(window.location.origin + `/story/${story._id}`)
        isCopy && toast.info('Story link copied successfully', { autoClose: 700 })
    }

    const handleSaveStory = () => {
        checkNetworkAndSession('both', () => saveStoryFunction(story._id))
    }
    const handleUpvote = () => {
        checkNetworkAndSession('both', () => upvoteFunction(story._id, user?._id || null))
    }
    const handleDeleteStory = () => {
        checkNetworkAndSession('both', () => deleteStoryFunction(story._id));
    }
   

    const badgeList = { first: 'text-cyan-400', second: 'text-yellow-500', third: 'text-gray-500' }

    return (
        <div className="bg-stone-50 bg-opacity-20 backdrop-blur-md shadow-sm shadow-stone-50 md:min-w-[280px] md:w-[45%] lg:max-w-xs  p-2 rounded w-full  flex flex-col gap-2">
            <div className="">
                <div className="font-semibold text-slate-900 text-lg flex justify-between items-center">
                    <h2>{story.title}</h2>
                    {
                        badge && <div className="relative flex justify-center items-center">
                            <p className="absolute text-stone-50 text-sm">{badge === 'first' ? 1 : badge === 'second' ? 2 : badge === 'third' ? 3 : ''}</p>
                            <BiSolidBadge className={`text-2xl ${badgeList[badge]}`} />
                        </div>
                    }
                </div>
                <p className="text-slate-900 tracking-[0.02em]">{story.story}</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
                <p>{new Date(story.createdAt).toLocaleDateString('en-IN')}</p>
                <p className="text-stone-200">{story.author.name}</p>
            </div>
            <div className="">
                <button onClick={() => setIsPromptOpen(p => !p)} className="flex gap-1 items-center cursor-pointer"><span>See Prompt</span> {isPromptOpen ? <BsChevronUp className="mt-1" /> : <BsChevronDown className="mt-1" />}</button>
                <div className={`bg-stone-50 bg-opacity-20 text-sm  rounded text-slate-800  overflow-hidden overflow-y-auto transition-height duration-200 ${isPromptOpen ? 'h-fit max-h-20 py-1 px-2' : 'h-0 p-0'}`}>
                    {story.prompt}
                </div>
            </div>
            <StoryCardFooter
                handleDeleteStory={handleDeleteStory}
                handleSaveStory={handleSaveStory}
                handleShareStory={handleShareStory}
                handleUpvote={handleUpvote}
                deletingStoryId={deletingStoryId}
                isAuthor={isAuthor}
                isSaved={isSaved}
                isUpvoted={isUpvoted}
                storyId={story._id}
                upVoteCount={story.upVotes.length}
            />
        </div>
    )
}

export default StoryCard