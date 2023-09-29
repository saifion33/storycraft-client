import { BiBookmark, BiSolidBookmark, BiSolidUpvote, BiUpvote } from "react-icons/bi"
import { PiShare } from 'react-icons/pi'
import { MdDeleteOutline } from 'react-icons/md'
import { IStory } from "../../Types"
import { BsChevronUp, BsChevronDown } from 'react-icons/bs'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../redux-hooks-type"
import { checkNetworkAndSession } from "../../utils/helpers"
import { deleteStory, saveStory } from "../../redux/actions/story"
import { updateSaveStory } from "../../redux/slice/authSlice"
import { toast } from 'react-toastify'
import { upvote } from "../../redux/slice/storySlice"
import { upvoteStoryApi } from "../../Api"
import loadingIcon from '../../assets/loading-icon-white.svg'
import { useNavigate } from "react-router-dom"
import copy from "copy-to-clipboard"
interface IProps {
    story: IStory,
    savedStories: string[] | null,

}

const StoryCard = ({ story, savedStories }: IProps) => {
    const user = useAppSelector(state => state.auth.user);
    const userId = user?._id
    const isSaved = savedStories && savedStories.includes(story._id);
    const deletingStoryId = useAppSelector(state => state.stories.deletingStoryId)
    const isUpvoted = userId && story.upVotes.includes(userId);
    const isAuthor = story.author._id === userId;
    const navigate = useNavigate()
    const [isPromptOpen, setIsPromptOpen] = useState(false)
    const dispatch = useAppDispatch()

    const saveStoryFunction = async (storyId: string) => {
        dispatch(updateSaveStory({ storyId }))
        const response = await dispatch(saveStory({ storyId }))

        if (saveStory.rejected.match(response)) {
            dispatch(updateSaveStory({ storyId }))
            toast.info(response.payload?.message)
        }
    }
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
    const handleSaveStory = () => {
        checkNetworkAndSession('both', () => saveStoryFunction(story._id))
    }
    const handleUpvote = () => {
        checkNetworkAndSession('both', () => upvoteFunction(story._id, user?._id || null))
    }
    const handleDeleteStory = () => {
        checkNetworkAndSession('both', () => deleteStoryFunction(story._id));
    }
    const handleShareStory = () => {
        const isCopy = copy(window.location.origin + `/story/${story._id}`)
        isCopy && toast.info('Story link copied successfully', { autoClose: 700 })
    }
    return (
        <div className="bg-stone-50 bg-opacity-20 backdrop-blur-md shadow-sm shadow-stone-50 md:min-w-[280px] md:w-[45%] lg:max-w-xs  p-2 rounded w-full  flex flex-col gap-2">
            <div className="">
                <h2 className="font-semibold text-slate-900 text-lg">{story.title}</h2>
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
            <div className="bg-[#f12711] text-slate-900 p-1  rounded bg-opacity-30  text-xl flex gap-3 items-center">
                <div onClick={handleUpvote} className=" flex items-center">{isUpvoted ? <BiSolidUpvote className="cursor-pointer text-stone-50" /> : <BiUpvote className="cursor-pointer" />} <p className="text-lg">{story.upVotes.length}</p></div>
                <div onClick={handleSaveStory} className={`flex items-center cursor-pointer ${isSaved ? 'text-stone-50' : ''}`}>{isSaved ? <BiSolidBookmark /> : <BiBookmark />}<span className="text-base">{isSaved ? 'Saved' : 'Save'}</span></div>
                <div onClick={handleShareStory} className="flex items-center cursor-pointer"><PiShare /> <span className="text-base">Share</span></div>
                {(isAuthor && (deletingStoryId !== story._id)) && <div onClick={handleDeleteStory} className="flex items-center cursor-pointer ml-auto"><MdDeleteOutline /> <span className="text-base">Delete</span></div>}
                {(isAuthor && deletingStoryId === story._id) && <img className="w-6 ml-auto" src={loadingIcon} alt="loading icon" />}
            </div>
        </div>
    )
}

export default StoryCard