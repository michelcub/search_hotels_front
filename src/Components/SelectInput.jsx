export const SelectInput = ({name, action, placeholder, data, required=false}) => {
    if(data && data?.length === 0) return
    return (
        <select className="select w-full  bg-white opacity-[70%] rounded-none text-black text-lg" name={name||null} onChange={action} defaultValue={placeholder||null} required={required}>
            <option>{placeholder}</option>
            {
                data && data.length? data?.map(item => {
                    return (
                        <option key={item?.id||item}>{item?.name||item}</option>
                    )
                }) : null
            }
        </select>
    )
}