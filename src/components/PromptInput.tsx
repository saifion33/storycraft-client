import { AiOutlineClose } from 'react-icons/ai'
import { IoSend } from 'react-icons/io5'

interface IProps{
  closePrompt:()=>void
}
const PromptInput = ({closePrompt}:IProps) => {
  return (
    <div className="bg-stone-50 bg-opacity-20 backdrop-blur-md p-2 rounded">
      <div className='pb-2 flex justify-between items-center'>
        <p className="text-lg text-slate-800 font-medium">Story Prompt</p>
        <AiOutlineClose className="text-xl md:hidden" onClick={closePrompt}/>
      </div>
      <div className='flex items-center gap-2'>
        <textarea name="prompt" id="prompt" rows={2} className="w-full rounded-sm p-2 md:px-4 bg-stone-50 bg-opacity-40 focus:outline focus:outline-stone-50"></textarea>
        <IoSend className="text-5xl text-[#f12711]  opacity-70 hover:opacity-100 cursor-pointer" />
      </div>
    </div>
  )
}

export default PromptInput