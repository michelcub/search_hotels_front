
import { act, useEffect, useState } from 'react';
import toast from 'react-hot-toast';


import { SelectInput } from "../Components/SelectInput"
import { DateRangePicker } from '../Components/DateRangePicker';
import { TextInput } from '../Components/TextInput';
import { useFetch } from '../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import useAppContext from '../ContextManagment/AppContext';



export const SearchView= () => {
    const {actions, store} = useAppContext()
    const TOTAL_PERSON = [1,2]
    
    const url = import.meta.env.VITE_URL_API + '/hotel/'
    const {loading, data, error} = useFetch(url)

    useEffect(()=>{
        if(data){
            actions.setHotelList(data)
        }
    },[data])



    const [form, setForm] = useState();

    const navigate = useNavigate()

    const handleUserInput= (event) => {
        let value = event.target.value
        let name = event.target.name
        
        setForm((prev) => {
            return {
                ...prev,
                [name]:value
            }
        })

        
        
    }
    
    
   
    

    const handleSubmit = (event)=>{
        event.preventDefault()
        console.log(form)
        if(!form?.hotel || !form?.init || !form?.end || !form?.customer){
            toast.error('No se han rellenado todos los campos')
            return
        }
        actions.setForm(form)
        console.log(store.form, '>>>>>>>>>')
        navigate(`/hotel?hotel=${form.hotel}&init=${form.init}&end=${form.end}&customers=${form.customer}${form?.codigo?'&codigo=' + form.codigo: ''}`)
    }

    if(error){
        toast.error('Error al cargar los datos')
    }

    if(loading){
        return(
            <section className='w-full h-full flex justify-center items-center bg-transparent text-white'>
                <div>
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
                </div>
            </section>
        )
    }
    
    return(
        <section className="w-screen h-[90vh] bg-transparent flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-black opacity-[60%] w-[95vw] lg:w-[70vw] xl:w-[75vw] 2xl:w-[60vw] xl:h-[8rem] rounded shadow-2xl flex items-center justify-center flex-col xl:flex-row  p-3 gap-4 ">
                <label className="w-full xl:w-[14rem] text-white text-start">
                        Seleccione Hotel  <i className="fa-solid fa-hotel"></i> <br/>
                    <SelectInput placeholder={'Seleccione Hotel'} data={data} name={'hotel'} action={handleUserInput} required={true}/>
                </label>

                <label className="w-full xl:w-[22rem] text-white text-start">
                        Seleccione fecha  <i className="fa-solid fa-calendar-days"></i>
                        <DateRangePicker action={handleUserInput}/>
                </label>
                

                <div className='flex gap-3 w-full xl:w-[14rem]'>
                    <label className="xl:w-[6rem] text-white text-center">
                            Personas  <i className="fa-solid fa-user-group"></i>
                        <SelectInput placeholder={'1'} data={TOTAL_PERSON} name={'customer'} action={handleUserInput} required={true}/>
                    </label>

                    <label className="xl:w-[8rem] text-white text-center">
                            Codigo  <i className="fa-solid fa-percent"></i>
                        <TextInput placeholder={'codigo'} name={'codigo'} action={handleUserInput}/>
                    </label>
                </div>

                <label className="w-full xl:w-[8rem] text-white text-center flex items-end">
                    <button className='btn w-full bg-white opacity-[70%] rounded-none text-black text-lg mt-6'>
                    <i className="fa-solid fa-magnifying-glass"></i> Buscar
                    </button>
                </label>
                
            </form>
        </section>
    )
}