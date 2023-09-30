import { AiOutlineClose } from 'react-icons/ai'
import { IoSend } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../redux-hooks-type'
import loadingIcon from '../assets/loading-icon-white.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { IGenStory } from '../Types'
import { string, object } from 'yup'
import { generateStory } from '../redux/actions/story'
import { toast } from 'react-toastify'
import { checkNetworkAndSession } from '../utils/helpers'

const validationSchema = object({
  prompt: string().min(10, 'Minimum 10 characters required').max(100, 'Maximum 100 characters allowed.').required('Prompt is required.')
})

interface IProps {
  closePrompt: () => void
}
const PromptInput = ({ closePrompt }: IProps) => {
  const isGenrating = useAppSelector(state => state.stories.isGenerating)
  const dispatch = useAppDispatch()

  const generateStoryFunction=async(values:IGenStory)=>{
    const response = await dispatch(generateStory(values))
    if (generateStory.fulfilled.match(response)) {
      toast.success('Story Generated Successfully.', { autoClose: 2000 })
    } else if (generateStory.rejected.match(response)) {
      toast.info(response.payload?.message)
    }
  }

  const handleSubmit = async (values: IGenStory) => {
    checkNetworkAndSession('both',()=>generateStoryFunction(values))
  }
  return (
    <div className="bg-stone-50 bg-opacity-20 backdrop-blur-md p-2 rounded">
      <div className='pb-2 flex justify-between items-center'>
        <div>
          <label htmlFor='prompt' className="text-lg text-slate-800 font-medium">Story Prompt</label>
          <p className='text-sm text-stone-50'>Ex: Where everyone can fly.</p>
        </div>
        <AiOutlineClose className="text-xl md:hidden" onClick={closePrompt} />
      </div>
      <div >
        <Formik initialValues={{ prompt: '' }} onSubmit={handleSubmit} validationSchema={validationSchema}>
          <Form className='w-full flex items-center gap-2'>
            <div className='w-full space-y-1'>
              <Field name="prompt" id="prompt" className="w-full rounded-sm p-2 md:px-4 bg-stone-50 bg-opacity-40 focus:outline focus:outline-stone-50" />
              <ErrorMessage name='prompt' component={'p'} className='text-sm text-stone-50' />
            </div>
            {!isGenrating && <button aria-label="generate-story" type='submit'><IoSend className="text-5xl text-customOrange  opacity-70 hover:opacity-100 cursor-pointer" /></button>}
            {isGenrating && <img className='w-12' src={loadingIcon} alt='loading icon' />}
          </Form>
        </Formik>

      </div>
    </div>
  )
}

export default PromptInput