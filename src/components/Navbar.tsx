import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux-hooks-type'
import { logout } from '../redux/slice/authSlice'
import { MdHistoryEdu } from 'react-icons/md'

interface IProps {
    isMenuOpen: boolean
    setIsMenuOpen: (arg0: (arg0: boolean) => boolean) => void
}
const Navbar = ({ isMenuOpen, setIsMenuOpen }: IProps) => {
    const user=useAppSelector(state=>state.auth.user)
    const dispatch=useAppDispatch()
    const navigate=useNavigate()
    return (

        <div className="flex sticky top-0 left-0 z-50  items-center bg-customOrange bg-opacity-30 backdrop-blur-md text-2xl  text-center font-medium p-2 text-stone-50 ">
            <div className='sm:hidden' role='button' onClick={() => setIsMenuOpen(p => !p)}>
                {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            </div>
            <h1 onClick={()=>navigate('/')} className=' mx-auto cursor-pointer flex items-center gap-1 '><MdHistoryEdu className="text-3xl"/>Story Craft</h1>
            {user && <button onClick={()=>dispatch(logout())} className='bg-customOrange bg-opacity-50 text-sm  py-1 px-2 rounded' >Logout</button>}
            {!user && <button onClick={()=>navigate('/auth/login')} className='bg-customOrange bg-opacity-50 text-sm  py-1 px-2 rounded' >Login</button>}
        </div>

    )
}

export default Navbar