export const SelectInput = ({name, action, placeholder, data}) => {
    return (
        <select className="select w-full  bg-white opacity-[70%] rounded-none text-black text-lg" name={name} onChange={action}>
            <option disabled selected>{placeholder}</option>
            <option >{placeholder}</option>
            {
                data && data?.map(value => {
                    return (
                        `<option>${value}</option>`
                    )
                })
            }
        </select>
    )
}