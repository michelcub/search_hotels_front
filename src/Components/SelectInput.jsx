export const SelectInput = ({name, action, placeholder, data}) => {
    return (
        <select className="select w-full  bg-white opacity-[70%] rounded-none text-black text-lg" name={name||null} onChange={action} defaultValue={placeholder||null}>
            <option>{placeholder}</option>
            {
                data && data?.map(item => {
                    return (
                        <option key={item}>{item}</option>
                    )
                })
            }
        </select>
    )
}