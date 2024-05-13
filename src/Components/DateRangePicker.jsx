export const DateRangePicker = ({action}) => {
    return (
        <div className="flex items-center gap-3">
            <input className="input w-full max-w-xs bg-white opacity-[70%] rounded-none text-black text-lg" name={'init'} onChange={action}  type="date"/>
            <i className="fa-solid fa-arrow-right"></i>  
            <input className="input w-full max-w-xs bg-white opacity-[70%] rounded-none text-black text-lg"  name={'end'} onChange={action}  type="date"/>
        </div>
    )
}