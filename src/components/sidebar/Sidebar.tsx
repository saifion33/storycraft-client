import { BiSolidBookmark, BiSolidTrophy, BiUserCircle } from 'react-icons/bi'
import { useAppSelector } from '../../redux-hooks-type'
import { useNavigate } from 'react-router-dom'
interface IProps {
    isMenuOpen: boolean
}

const Sidebar = ({ isMenuOpen }: IProps) => {
    const user = useAppSelector(state => state.auth.user)
    const navigate = useNavigate()
    return (
        <div className={`h-screen z-40 fixed sm:static top-12 left-0 w-1/2 sm:w-[200px] lg:w-[320px] lg:border-r-[1px] text-slate-800  bg-opacity-20 sm:bg-opacity-30 backdrop-blur-md transition-all duration-500 sm:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='bg-stone-50 bg-opacity-20 h-full px-1 py-4  w-full top-10 left-0 ' >
                <div className='flex gap-2 px-2 items-center'>
                    <BiUserCircle className="text-4xl " />
                    {user && <p className='font-medium'>{user?.name}</p>}
                    {!user && <p onClick={() => navigate('/auth/login')} className='cursor-pointer'>Login</p>}
                </div>
                <ul className='mt-5 p-2 space-y-3'>
                    <li onClick={()=>navigate('/saved')} className='flex gap-1 items-center bg-[#f12711] bg-opacity-40 p-1 font-medium cursor-pointer'><BiSolidBookmark className="text-lg" /> Saved Story</li>
                    <li onClick={()=>navigate('/leaderboard')} className='flex gap-1 items-center bg-[#f12711] bg-opacity-40 p-1 font-medium cursor-pointer'><BiSolidTrophy className="text-lg" /> Leader Board</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar