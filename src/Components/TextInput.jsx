export const TextInput = ({name, action, placeholder, value, type='text'}) => {
    return (
        <input className="input w-full max-w-xs bg-white opacity-[70%] rounded-none text-black text-lg" placeholder={placeholder} name={name} onChange={action} value={value} type={type}/>
           
    )
}