import { useAppDispatch, useAppSelector } from '../redux-hooks-type'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import loadingIcon from '../assets/loading-icon-white.svg'
import { signup } from '../redux/actions/auth'
import { useNavigate } from 'react-router-dom'
import Topbar from '../components/Topbar'
import { ISignupForm } from '../Types'
import { string, object } from 'yup'
import { toast } from 'react-toastify'

const validationSchema = object({
    name: string().min(3, 'Minimum 3 character is required.').required('Name is required.'),
    email: string().email('Invalid Email').required('Email is required.'),
    password: string().min(6, 'Password length should be 6').matches(/^(?=.*[a-zA-Z])(?=.*\d).*$/, 'Password contains atleast 1 number and 1 alfabet.').required('Password is required.')
})


const Signup = () => {
    const loading = useAppSelector(state => state.auth.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const initialValues = {
        name: '',
        email: '',
        password: ''
    }
    const handleSubmit = async (values: ISignupForm) => {
        const response = await dispatch(signup(values))
        if (signup.fulfilled.match(response)) {
            toast.success('Signup successfully.')
            navigate('/')
        }
        if (signup.rejected.match(response)) {
            toast.info(response.payload?.message)
        }
    }

    return (
        <>
            <Topbar name='Signup' />
            <div className='h-full p-4 flex justify-center items-center'>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}  >
                    <Form className='w-full max-w-xl bg-stone-50 bg-opacity-30 backdrop-blur-md p-3 rounded space-y-3'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-lg font-semibold text-slate-900' htmlFor="name">Name</label>
                            <Field className="p-2 rounded border-[1px] border-slate-900 bg-stone-50 bg-opacity-30 focus:border-none focus:outline focus:outline-stone-50" name="name" />
                            <ErrorMessage className='text-stone-50' name='name' component={'div'} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-lg font-semibold text-slate-900' htmlFor="email">Email</label>
                            <Field className="p-2 rounded border-[1px] border-slate-900 bg-stone-50 bg-opacity-30 focus:border-none focus:outline focus:outline-stone-50" name="email" />
                            <ErrorMessage className='text-stone-50' name='email' component={'div'} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-lg font-semibold text-slate-900' htmlFor="password">password</label>
                            <Field className="p-2 rounded border-[1px] border-slate-900 bg-stone-50 bg-opacity-30 focus:border-none focus:outline focus:outline-stone-50 " type="password" name="password" />
                            <ErrorMessage className='text-stone-50' name='password' component={'div'} />
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-slate-900 text-sm'>Already have an account? <span onClick={() => navigate('/auth/login')} className='text-stone-50 cursor-pointer'>Login</span></p>
                            {!loading && <button className='  bg-[#f12711] py-1 px-2 rounded text-stone-50 bg-opacity-60 hover:bg-opacity-80' type="submit">Signup</button>}
                            {loading && <div className=' w-fit bg-[#f12711] py-1 px-2 rounded text-stone-50 bg-opacity-60 hover:bg-opacity-80 flex gap-1'>Loading <img src={loadingIcon} className='w-5' /></div>}
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default Signup