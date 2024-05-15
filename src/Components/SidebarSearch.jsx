import { useNavigate } from "react-router-dom"
import useAppContext from "../ContextManagment/AppContext"
import { DateRangePicker } from "./DateRangePicker"
import { SelectInput } from "./SelectInput"
import { TextInput } from "./TextInput"
import toast from "react-hot-toast"
import { useEffect } from "react"



export const SidebarSearch = () => {

    const TOTAL_PERSON = [1,2]
    const {actions, store} = useAppContext()
    
    const navigate = useNavigate()


    if(!store.hotelList || store.hotelList.length === 0){     
        toast.error('Ha ocurrido un error al cargar los hoteles')
        navigate('/')
    }
    useEffect(()=>{
        if(!store.form?.hotel || !store.form?.init || !store.form?.end || !store.form?.customer){
            console.log('No se han rellenado todos los campos')
            navigate('/')
        }
    },[])
    


    const handleUserInput= (event) => {
        let value = event.target.value
        let name = event.target.name

        actions.setForm((prev) => {
            return {
                ...prev,
                [name]:value
            }
        })

        }



    return (
        <section className="w-[20vw] h-[80vh] bg-transparent flex justify-center items-center p-2 hidden sm:block">
            <form className="bg-black opacity-[70%] w-full h-full rounded-xl flex flex-col p-4 gap-14">
                <label className="w-full  text-white text-start mt-8">
                        Seleccione Hotel  <i className="fa-solid fa-hotel"></i> <br/>
                    <SelectInput placeholder={store?.form?.hotel} data={store?.hotelList} name={'hotel'} action={handleUserInput} required={true}/>
                </label>

                <label className="w-full  text-white text-start">
                        Seleccione fecha  <i className="fa-solid fa-calendar-days"></i>
                        <DateRangePicker action={handleUserInput}/>
                </label>
                

                <div className='flex gap-3 w-full  flex-col'>
                    <label className="w-full text-white text-center">
                            Personas  <i className="fa-solid fa-user-group"></i>
                        <SelectInput placeholder={store?.form?.customer || '-'} data={TOTAL_PERSON} name={'customer'} action={handleUserInput} required={true}/>
                    </label>

                    <label className="w-full text-white text-center">
                            Codigo  <i className="fa-solid fa-percent"></i>
                        <TextInput placeholder={store?.form?.codigo? store.form.codigo : 'Codigo descuento'} name={'codigo'} action={handleUserInput}/>
                    </label>
                </div>

                <label className="w-full text-white text-center flex items-end">
                    <button className='btn w-full bg-white opacity-[70%] rounded-none text-black text-lg mt-6'>
                    <i className="fa-solid fa-magnifying-glass"></i> Buscar
                    </button>
                </label>

            </form>
        </section>
    )
}