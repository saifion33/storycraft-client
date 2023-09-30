import { BiBookmark, BiSolidBookmark, BiSolidUpvote, BiUpvote } from 'react-icons/bi';
import loadingIcon from '../../assets/loading-icon-white.svg'
import { PiShare } from 'react-icons/pi';
import { MdDeleteOutline } from 'react-icons/md';

interface IProps{
    handleUpvote:()=>void
    handleSaveStory:()=>void
    handleShareStory:()=>void
    handleDeleteStory:()=>void
    deletingStoryId:string |null
    isAuthor:boolean
    isUpvoted:boolean |null
    isSaved:boolean | null
    storyId:string
    upVoteCount:number
}
const StoryCardFooter = ({handleUpvote,handleDeleteStory,handleSaveStory,handleShareStory,deletingStoryId,isAuthor,isUpvoted,isSaved,storyId,upVoteCount}:IProps) => {
    return (
        <div className="bg-customOrange text-slate-900 p-1  rounded bg-opacity-30  text-xl flex gap-3 items-center">
            <div onClick={handleUpvote} className=" flex items-center">{isUpvoted ? <BiSolidUpvote className="cursor-pointer text-stone-50" /> : <BiUpvote className="cursor-pointer" />} <p className="text-lg">{upVoteCount}</p></div>
            <div onClick={handleSaveStory} className={`flex items-center cursor-pointer ${isSaved ? 'text-stone-50' : ''}`}>{isSaved ? <BiSolidBookmark /> : <BiBookmark />}<span className="text-base">{isSaved ? 'Saved' : 'Save'}</span></div>
            <div onClick={handleShareStory} className="flex items-center cursor-pointer"><PiShare /> <span className="text-base">Share</span></div>
            {(isAuthor && (deletingStoryId !== storyId)) && <div onClick={handleDeleteStory} className="flex items-center cursor-pointer ml-auto"><MdDeleteOutline /> <span className="text-base">Delete</span></div>}
            {(isAuthor && deletingStoryId === storyId) && <img className="w-6 ml-auto" src={loadingIcon} alt="loading icon" />}
        </div>
    )
}

export default StoryCardFooter