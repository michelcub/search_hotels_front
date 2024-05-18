export const TextInput = ({name, action, placeholder, value, type='text', required=false}) => {
    return (
        <input className="input w-full max-w-xs bg-white opacity-[70%] rounded-none text-black text-lg" 
        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=])[0-9a-zA-Z!@#$%^&*()-_+=]{8,}$"
        title="La contraseña debe contener al menos un dígito, una letra minúscula, una letra mayúscula, un carácter especial y tener al menos 8 caracteres de longitud."
        placeholder={placeholder} name={name} onChange={action} value={value} type={type} required={required}/>
           
    )
}