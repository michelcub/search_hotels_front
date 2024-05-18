import { useContext, createContext, useState, act } from "react";
import toast from "react-hot-toast";

const ApppContext = createContext();

export const Appprovider = ({children}) => {


    const [hotelList, setHotelList] = useState([])
    const [form, setForm] = useState()
    const [roomList, setRoomList] = useState()
    const [roomSelected, setRoomSelected] = useState()
    const [serviceList, setServiceList] = useState()
    const [step, setStep] = useState(1)
    const [reservation, setReservation] = useState()
    const [createdPayment, setCreatedPayment] = useState()
    const [createdReservation, setCreatedReservation] = useState()


    const clearReservation = () => {
        setReservation(null)
        setCreatedPayment(null)
        setCreatedReservation(null)
        setStep(1)
        setForm(null)
        setRoomList(null)
        setRoomSelected(null)
        setServiceList(null)
        
    }

    const setPayment = () => {
        fetch(`${import.meta.env.VITE_URL_API}/payment/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount:reservation.total})
        })
        .then(response => response.json())
        .then(data => {
            if(data.error){
                toast.error(data.error)
                throw new Error(data.error)
            }
            setCreatedPayment(data)
            let updatedReservation = {...reservation}
            toast.success('Payment created')
            updatedReservation.payment = data.id
            setReservation(updatedReservation)
            createReservation(updatedReservation)
        })
        .catch(error => {
            toast.error(error.message)
            return false
        })
        
    }

    const createReservation = (reservation) => {
        fetch(`${import.meta.env.VITE_URL_API}/reservation/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservation)
        })
        .then(response => response.json())
        .then(data => {
            if(data.error){
                toast.error(data.error)
                return
            }
            
            setCreatedReservation(data)
            toast.success('Reservation created')
            setStep(4)
        })
    }

    const actions = {
        setHotelList,
        setForm,
        setRoomSelected,
        setStep,
        setServiceList,
        setRoomList,
        setReservation,
        createReservation,
        setPayment,
        clearReservation
    }

    const store = {
        hotelList,
        form,
        roomSelected,
        step,
        serviceList, 
        roomList,
        reservation,
        createdPayment,
        createdReservation
    }

    return (
        <ApppContext.Provider value={{actions, store}}>
            {children}
        </ApppContext.Provider>
    );
}

const useAppContext = () => useContext(ApppContext);
export default useAppContext;