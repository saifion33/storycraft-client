import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'

interface IProps {
    isMenuOpen: boolean
    setIsMenuOpen: (arg0: (arg0: boolean) => boolean) => void
}
const Navbar = ({ isMenuOpen, setIsMenuOpen }: IProps) => {

    return (

        <div className="flex sticky top-0 left-0 z-50  items-center bg-[#f12711] bg-opacity-30 backdrop-blur-md text-2xl  text-center font-medium p-2 text-stone-50 ">
            <div className='sm:hidden' role='button' onClick={() => setIsMenuOpen(p => !p)}>
                {isMenuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            </div>
            <h1 className='self-center mx-auto'>Story Craft</h1>
        </div>

    )
}

export default Navbar