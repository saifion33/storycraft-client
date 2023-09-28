import { BiBookmark, BiSolidBookmark, BiSolidUpvote, BiUpvote } from "react-icons/bi"
import { PiShare } from 'react-icons/pi'
import { MdDeleteOutline } from 'react-icons/md'
import { IStory } from "../../Types"
import { BsChevronUp, BsChevronDown } from 'react-icons/bs'
import { useState } from 'react'

interface IProps {
    story: IStory,
    savedStories: string[],
}

const StoryCard = ({ story, savedStories }: IProps) => {
    const userId = 'skldfjie8r4'
    const isSaved = savedStories.includes(story._id);
    const isUpvoted = story.upVotes.includes(userId);
    const isAuthor = story.author._id === userId;
    const [isPromptOpen, setIsPromptOpen] = useState(false)
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
                <button onClick={() => setIsPromptOpen(p => !p)} className="flex gap-1 items-center cursor-pointer"><span>See Prompts</span> {isPromptOpen ? <BsChevronUp className="mt-1" /> : <BsChevronDown className="mt-1" />}</button>
                <div className={`bg-stone-50 bg-opacity-20 text-sm  rounded text-slate-800  overflow-hidden overflow-y-auto transition-height duration-200 ${isPromptOpen ? 'h-fit max-h-20 py-1 px-2' : 'h-0 p-0'}`}>
                    {story.prompt}
                </div>
            </div>
            <div className="bg-[#f12711] text-slate-900 p-1  rounded bg-opacity-30  text-xl flex gap-3 items-center">
                <div className=" flex items-center">{isUpvoted ? <BiSolidUpvote className="cursor-pointer text-stone-50" /> : <BiUpvote className="cursor-pointer" />} <p className="text-lg">{story.upVotes.length}</p></div>
                <div className={`flex items-center cursor-pointer ${isSaved ? 'text-stone-50' : ''}`}>{isSaved ? <BiSolidBookmark /> : <BiBookmark />}<span className="text-base">{isSaved ? 'Saved' : 'Save'}</span></div>
                <div className="flex items-center cursor-pointer"><PiShare /> <span className="text-base">Share</span></div>
                {isAuthor && <div className="flex items-center cursor-pointer ml-auto"><MdDeleteOutline /> <span className="text-base">Delete</span></div>}
            </div>
        </div>
    )
}

export default StoryCard