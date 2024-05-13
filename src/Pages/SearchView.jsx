
import { useState } from 'react';


import { SelectInput } from "../Components/SelectInput"
import { DateRangePicker } from '../Components/DateRangePicker';
import { TextInput } from '../Components/TextInput';



export const SearchView= () => {

    const [selectionRange, setSelectionRange] = useState();

    

    return(
        <section className="w-screen h-[90vh] bg-transparent flex justify-center items-center">
            <form className="bg-black opacity-[60%] w-[95vw] xl:w-[60vw] xl:h-[8rem] rounded shadow-2xl flex items-center flex-col xl:flex-row  p-3 gap-4 ">
                <label className="w-full xl:w-[14rem] text-white text-start">
                        Seleccione Hotel  <i className="fa-solid fa-hotel"></i> <br/>
                    <SelectInput placeholder={'Sleccione Hotel'}/>
                </label>

                <label className="w-full xl:w-[22rem] text-white text-start">
                        Seleccione fecha  <i className="fa-solid fa-calendar-days"></i>
                        <DateRangePicker/>
                </label>
                

                <div className='flex gap-3 w-full xl:w-[14rem]'>
                    <label className="xl:w-[6rem] text-white text-center">
                            Personas  <i className="fa-solid fa-user-group"></i>
                        <SelectInput placeholder={'0'}/>
                    </label>

                    <label className="xl:w-[8rem] text-white text-center">
                            Codigo  <i className="fa-solid fa-percent"></i>
                        <TextInput placeholder={'codigo'}/>
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