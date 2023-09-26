import { Formik, Form, Field, ErrorMessage } from 'formik'
import { ISignupForm } from '../Types'
import { useAppDispatch, useAppSelector } from '../redux-hooks-type'
import loadingIcon from '../assets/loading-icon-white.svg'
import { signup } from '../redux/actions/auth'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const loading = useAppSelector(state => state.auth.loading)
    const dispatch = useAppDispatch()
    const navigate=useNavigate()
    const initialValues = {
        name: '',
        email: '',
        password: ''
    }
    const handleSubmit = async (values: ISignupForm) => {
        const response = await dispatch(signup(values))
        if (signup.fulfilled.match(response)) {
            alert('Signup successfully')
            navigate('/')
        }
        if (signup.rejected.match(response)) {
            alert(response.payload?.message)
        }
    }

    return (
        <div className='h-full p-4 flex justify-center items-center'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
                <Form className='w-full max-w-xl bg-stone-50 bg-opacity-30 backdrop-blur-md p-3 rounded space-y-3'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold text-slate-900' htmlFor="name">Name</label>
                        <Field className="p-2 rounded border-[1px] border-slate-900 bg-stone-50 bg-opacity-30" name="name" />
                        <ErrorMessage className='text-red-500' name='name' component={'div'} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold text-slate-900' htmlFor="email">Email</label>
                        <Field className="p-2 rounded border-[1px] border-slate-900 bg-stone-50 bg-opacity-30" name="email" />
                        <ErrorMessage className='text-red-500' name='email' component={'div'} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-lg font-semibold text-slate-900' htmlFor="password">password</label>
                        <Field className="p-2 rounded border-[1px] border-slate-900 bg-stone-50 bg-opacity-30" type="password" name="password" />
                        <ErrorMessage className='text-red-500' name='password' component={'div'} />
                    </div>
                    <div className='pt-3' >
                        {!loading && <button className='ml-auto block  bg-[#f12711] py-1 px-2 rounded text-stone-50 bg-opacity-60 hover:bg-opacity-80' type="submit">Signup</button>}
                        {loading && <div className='ml-auto w-fit bg-[#f12711] py-1 px-2 rounded text-stone-50 bg-opacity-60 hover:bg-opacity-80 flex gap-1'>Loading <img src={loadingIcon} className='w-5' /></div>}
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Signup