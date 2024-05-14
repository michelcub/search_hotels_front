export const SelectInput = ({name, action, placeholder, data, required=false}) => {
    return (
        <select className="select w-full  bg-white opacity-[70%] rounded-none text-black text-lg" name={name||null} onChange={action} defaultValue={placeholder||null} required={required}>
            <option>{placeholder}</option>
            {
                data && data?.map(item => {
                    return (
                        <option key={item?.id||item}>{item?.name||item}</option>
                    )
                })
            }
        </select>
    )
}