import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

interface IProps{
    backTo?:string
    name?:string
}
const Topbar = ({backTo,name}:IProps) => {
    const navigate=useNavigate()
  return (
    <div className="bg-stone-50 p-2 bg-opacity-30 flex items-center text-slate-900">
        <BiArrowBack role="button" onClick={()=>backTo?navigate(backTo):navigate(-1)} className="text-2xl cursor-pointer"/>
        {name && <p className="mx-auto text-xl">{name}</p>}
    </div>
  )
}

export default Topbar