import toast from "react-hot-toast";
import useAppContext from "../ContextManagment/AppContext"
import { TextInput } from "./TextInput";
import { ModalPayment } from "./ModalPayment";
import { useEffect, useState } from "react";





export const ReservationView = () => {

    const {actions, store} = useAppContext()
    const [showDetails, setShowDetails] = useState(true)
    const [total, setTotal] = useState(0)
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
        
        total *= totalNoches
        if(store.form?.services?.length){
            store.form?.services?.forEach((service) => {
                let s = store.serviceList.find(item => item.id == service)
                total += Number(s?.price)
            })
        }
        actions.setReservation({total, noches: totalNoches, room: store.roomSelected, services: store.form?.services})
        return total
    }

    const handleAddUser = () => {
        let user = store.form?.customer
        user++
        actions.setForm({...store.form, customer: user})
    
    }

    useEffect(() => {
        let total = calculateTotal()
        setTotal(total)
    }, [])

    const handleUserInput = (e) => {
        const targetNameParts = e.target.name.split('_');
        const user = targetNameParts[2];
        const reservationType = targetNameParts[0];

       
        const updatedReservation = { ...store.reservation };
        
        
        if (!updatedReservation.users) {
            updatedReservation.users = [];
        }

        
        let userObject = updatedReservation.users.find(user_position => user_position.id  === user);
        
        if (!userObject) {
            userObject = { id: user };
            updatedReservation.users.push(userObject);
            
        }

        
        userObject[reservationType] = e.target.value;
        updatedReservation['init'] = store.form.init
        updatedReservation['end'] = store.form.end
        
        actions.setReservation(updatedReservation);
       
        
};

    const handleOnsubmit = (e) => {
        e.preventDefault()
        document.getElementById('modal_payment').showModal()
         setShowDetails(false)
    }
    

    return(
        <section className="w-screen h-[80vh] bg-transparent text-white flex justify-center items-center overflow-hidden">
                <div className={`bg-black opacity-[60%] w-[60vw] h-[70vh] rounded-2xl p-6 ${showDetails? '': 'hidden'}`}>
                    <div className="flex items-center justify-around">
                        <div>
                            <h1 className="text-3xl">Reservation Details</h1>
                            <p className="text-lg">Review the details of your reservation</p>
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

                                <h2 className="mt-5 text-xl font-bold underline">Total: {total}</h2>
                            </div>
                        </div>
                        
                        <div className="w-[70%]">
                            <form className="flex flex-col gap-5 w-full" onSubmit={handleOnsubmit}>
                                <div className="flex flex gap-3 w-full">
                                <div className="flex flex-col gap-3 w-[50%]">
                                    <h2>Main User</h2>
                                    <label className="flex flex-col">
                                        Name
                                        <TextInput placeholder={'Nombre'} name={'name_user_1'} action={handleUserInput} required={true}/>
                                        </label>
                                    <label className="flex flex-col">
                                        Apellidos
                                        <TextInput placeholder={'Apellidos'} name={'lastname_user_1'} action={handleUserInput} required={true}/>
                                    </label>
                                    <label className="flex flex-col">
                                        Email
                                    <TextInput placeholder={'Email'} name={'email_user_1'} action={handleUserInput} type="email" required={true} />
                                    </label>
                                    <label className="flex flex-col">
                                        Password
                                        <TextInput placeholder={'Password'} name={'password_user_1'} action={handleUserInput} type={"password"} required={true}/>
                                    </label>
                                </div>

                                <button type="button" className={`${Number(store.form?.customer) == 1 ? 'block': 'hidden'} btn mt-auto mb-auto`} onClick={handleAddUser}  disabled={store.form?.customer == store.roomSelected?.max_customers? true : false}>
                                <i className="fa-solid fa-user-plus"></i>
                                </button>
                                
                                <div className={`flex flex-col gap-3 w-[50%] ${Number(store.form?.customer) == 1 && 'hidden'}`}>
                                    <h2>Other User</h2>
                                    <label className="flex flex-col">
                                        Name
                                        <TextInput placeholder={'Nombre'} name={'name_user_2'} action={handleUserInput} required={Number(store.form?.customer) == 1?false:true}/>
                                    </label>
                                    <label className="flex flex-col">
                                        Apellidos
                                        <TextInput placeholder={'Apellidos'} name={'lastname_user_2'} action={handleUserInput} required={Number(store.form?.customer) == 1?false:true}/>
                                    </label>
                                    <label className="flex flex-col">
                                        Email
                                        <TextInput placeholder={'Email'} name={'email_user_2'} action={handleUserInput} required={Number(store.form?.customer) == 1?false:true} type="email"/>
                                    </label>
                                </div>
                                </div>
                                <div className="">
                                    <button className="btn bg-green-400 border-0 w-full" type="submit">Reservar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <ModalPayment/>
            </section>
    )
}