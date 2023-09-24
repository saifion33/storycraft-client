import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { BiUserCircle, BiSolidBookmark, BiSolidTrophy } from 'react-icons/bi'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className=''>
            <div className="flex  sticky top-0 left-0  items-center bg-[#f12711] bg-opacity-30 backdrop-blur-md text-2xl  text-center font-medium p-2 text-stone-50 ">
                <div className='md:hidden' role='button' onClick={() => setIsMenuOpen(p => !p)}>
                    {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                </div>
                <h1 className='self-center mx-auto'>Story Craft</h1>
            </div>
            <div className={`h-screen fixed top-12 left-0 w-1/2 max-w-[200px] lg:max-w-xs lg:border-r-[1px] text-slate-800  bg-opacity-20 lg:bg-opacity-30 backdrop-blur-md transition-all duration-500 md:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='bg-stone-50 bg-opacity-20  h-full px-1 py-4 ' >
                    <div className='flex gap-2 px-2 items-center '>
                        <BiUserCircle className="text-4xl " />
                        <p className='font-medium'>Azeem Saifi</p>
                    </div>
                    <ul className='mt-5 p-2 space-y-3'>
                        <li className='flex gap-1 items-center bg-[#f12711] bg-opacity-40 p-1 font-medium cursor-pointer'><BiSolidBookmark className="text-lg" /> Saved Story</li>
                        <li className='flex gap-1 items-center bg-[#f12711] bg-opacity-40 p-1 font-medium cursor-pointer'><BiSolidTrophy className="text-lg" /> Leader Board</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar