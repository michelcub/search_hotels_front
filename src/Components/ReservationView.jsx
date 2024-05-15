import toast from "react-hot-toast";
import useAppContext from "../ContextManagment/AppContext"
import { TextInput } from "./TextInput";





export const ReservationView = () => {

    const {actions, store} = useAppContext()

    const calcularTotalNoches = (fechaInicio, fechaFinal) => {
        const fechaInicioObj = new Date(fechaInicio);
        const fechaFinalObj = new Date(fechaFinal);
        
        
        const diferenciaMilisegundos = fechaFinalObj - fechaInicioObj;
        
        
        const milisegundosPorDia = 1000 * 60 * 60 * 24;
        const diferenciaDias = Math.round(diferenciaMilisegundos / milisegundosPorDia);
        
        return Number(diferenciaDias);
    }

    const calculateTotal = () => {
        let total = 0;
        let room = store.roomList.find(room => room.id == store?.roomSelected.id)
        
        total += Number(room?.price)
        let totalNoches = calcularTotalNoches(store.form?.init, store.form?.end)
        // toast.success(`Total de noches: ${totalNoches}`)
        // toast.success(`Total : ${total}`)
        total *= totalNoches
        if(store.form?.services?.length){
            store.form?.services?.forEach((service) => {
                let s = store.serviceList.find(item => item.id == service)
                total += Number(s?.price)
            })
        }
        return total
    }

    return(
        <section className="w-screen h-[80vh] bg-transparent text-white flex justify-center items-center ">
                <div className="bg-black opacity-[60%] w-[60vw] h-[70vh] rounded-2xl p-6">
                    <div className="flex items-center justify-around">
                        <div>
                            <h1 className="text-3xl">Reservation Details</h1>
                            <p className="text-lg">Review the details of your reservation</p>
                        </div>
                        <div>
                            <button className="btn bg-green-400 border-0">Reservar</button>
                        </div>
                    </div>
                    <div className="w-full h-[55vh] transparent mt-5 rounded-2xl flex    gap-3 overflow-x-auto p-6">
                        <div className="w-[30%]">
                            <h1 className="text-3xl">All Services</h1>

                            <div>
                                <h2 className="mt-3"><i className="fa-solid fa-hotel"></i> Hotel</h2>
                                <p>{store.form?.hotel.toUpperCase()}</p>

                                <h2 className="mt-3"><i className="fa-solid fa-person-shelter"></i> Room</h2>
                                {
                                    store.roomSelected ? (
                                        <p>{store.roomSelected.name.toUpperCase()} - ${store.roomSelected.price}</p>
                                        
                                    ): <p>No room selected</p>
                                }
                                <p>Noches: {calcularTotalNoches(store.form.init, store.form.end)}</p>
                                <h2 className="mt-3">Extra Sercives</h2>
                                {
                                    store.form?.services?.length ? store.form?.services?.map((item, index) => {
                                        let service = store.serviceList.find(service => service?.id == item)
                                        return <p key={index}>{service?.name} - ${service?.price}</p>
                                    }): <p>No services selected</p>
                                }

                                <h2 className="mt-5 text-xl font-bold underline">Total: {calculateTotal()}</h2>
                            </div>
                        </div>
                        
                        <div className="w-[70%]">
                            <form className="flex flex gap-3 w-full">
                                <div className="flex flex-col gap-3 w-full">
                                    <h2>Main User</h2>
                                    <TextInput placeholder={'Nombre'} name={'name'} action={actions.setForm}/>
                                    <TextInput placeholder={'Apellido'} name={'lastname'} action={actions.setForm}/>
                                    <TextInput placeholder={'Email'} name={'email'} action={actions.setForm}/>
                                    <TextInput placeholder={'Password'} name={'password'} action={actions.setForm}/>
                                </div>

                                <div className="flex flex-col gap-3 w-full">
                                    <h2>Other User</h2>
                                    <TextInput placeholder={'Nombre'} name={'name'} action={actions.setForm}/>
                                    <TextInput placeholder={'Apellido'} name={'lastname'} action={actions.setForm}/>
                                    <TextInput placeholder={'Email'} name={'email'} action={actions.setForm}/>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    )
}