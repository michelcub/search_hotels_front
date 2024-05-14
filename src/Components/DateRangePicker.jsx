export const DateRangePicker = ({action}) => {

    const handleSelectDate = (event) => {
        action(event)
        document.getElementById('endDate').focus()
    }


    return (
        <div className="flex items-center gap-3">
            <input id="initDate" className="input w-full max-w-xs bg-white opacity-[70%] rounded-none text-black text-lg" name={'init'} onChange={handleSelectDate}  type="date" required={true}/>
            <i className="fa-solid fa-arrow-right"></i>  
            <input id="endDate" className="input w-full max-w-xs bg-white opacity-[70%] rounded-none text-black text-lg"  name={'end'} onChange={action}  type="date" required={true}/>
        </div>
    )
}