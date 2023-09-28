import loadingIcon from '../assets/loading-icon-white.svg'
const Loading = () => {
  return (
    <div className='h-full w-full flex justify-center items-center text-slate-900'>
      <div className='space-y-3'>
        <img src={loadingIcon} alt="loading icon" />
        <p className='text-xl text-center text-stone-50 font-medium'>Loading...</p>
      </div>
    </div>
  )  
}

export default Loading