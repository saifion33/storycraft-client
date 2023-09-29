
const DummyCard = () => {
    return (
        <div className="bg-stone-50 bg-opacity-20 backdrop-blur-md shadow-sm shadow-stone-50 md:min-w-[280px] md:w-[45%] lg:max-w-xs  p-2 rounded w-full  flex flex-col gap-2 animate-pulse">
            <div className="space-y-3">
                <h2 className="w-full h-7 bg-stone-50 bg-opacity-40"></h2>
                <p className="w-full h-56 bg-stone-50 bg-opacity-40 rounded"></p>
            </div>
            <div className="flex items-center justify-between mt-auto">
                <p className='w-20 h-7 bg-stone-50 bg-opacity-30 rounded-sm'></p>
                <p className='w-20 h-7 bg-stone-50 bg-opacity-30 rounded-sm'></p>

            </div>
            <div className="flex justify-between items-center">
                <p className='w-28 h-7 bg-stone-50 bg-opacity-30 rounded-sm'></p>
            </div>
            <div className="bg-[#f12711] text-slate-900 p-1 h-9  rounded bg-opacity-30  text-xl flex gap-3 items-center">

            </div>
        </div>
    )
}

export default DummyCard