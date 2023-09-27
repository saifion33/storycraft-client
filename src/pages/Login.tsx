import { useAppDispatch, useAppSelector } from "../redux-hooks-type"
import { useNavigate } from "react-router-dom"
import { ErrorMessage, Field, Formik, Form } from "formik"
import { login } from "../redux/actions/auth"
import { ILoginForm } from "../Types"
import loadingIcon from '../assets/loading-icon-white.svg'
import { object, string } from 'yup'
import Topbar from "../components/Topbar"

const validationSchema = object({
  email: string().email('Invalid email').required('Email is required.'),
  password: string().required('Password is required.')
})

const Login = () => {
  const loading = useAppSelector(state => state.auth.loading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const initialValues: ILoginForm = {
    email: '',
    password: ''
  }
  const handleSubmit = async (values: ILoginForm) => {
    const response = await dispatch(login(values))
    if (login.fulfilled.match(response)) {
      alert('Logged successfully')
      navigate('/')
    }
    if (login.rejected.match(response)) {
      alert(response.payload?.message)
    }
  }

  return (
    <>
      <Topbar name="Login" />
      <div className='h-full p-4 flex justify-center items-center'>

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}  >
          <Form className='w-full max-w-xl bg-stone-50 bg-opacity-30 backdrop-blur-md p-3 rounded space-y-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-lg font-semibold text-slate-900' htmlFor="email">Email</label>
              <Field className="p-2 rounded border-[1px] border-slate-900 bg-stone-50 bg-opacity-30 focus:border-none focus:outline focus:outline-stone-50" name="email" />
              <ErrorMessage className='text-red-500' name='email' component={'div'} />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-lg font-semibold text-slate-900' htmlFor="password">password</label>
              <Field className="p-2 rounded border-[1px] border-slate-900 bg-stone-50 bg-opacity-30 focus:border-none focus:outline focus:outline-stone-50" type="password" name="password" />
              <ErrorMessage className='text-red-500' name='password' component={'div'} />
            </div>
            <div className='flex justify-between' >
              <p className="text-slate-900 text-sm">Don't have an account? <span onClick={() => navigate('/auth/signup')} className="text-stone-50 cursor-pointer">Signup</span></p>
              {!loading && <button className='  bg-[#f12711] py-1 px-2 rounded text-stone-50 bg-opacity-60 hover:bg-opacity-80' type="submit">Login</button>}
              {loading && <div className=' w-fit bg-[#f12711] py-1 px-2 rounded text-stone-50 bg-opacity-60 hover:bg-opacity-80 flex gap-1'>Loading <img src={loadingIcon} className='w-5' /></div>}
            </div>
          </Form>
        </Formik>
      </div>
    </>
  )
}

export default Login