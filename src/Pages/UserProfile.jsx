import { useEffect, useState } from "react";
import useLoginContext from "../ContextManagment/LoginContext";
import { useFetch } from "../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



export const UserProfile = () => {
    const {actions, store} = useLoginContext();
    const [reservations, setReservations] = useState()
    const {loading, data, error} = useFetch(`${import.meta.env.VITE_URL_API}/reservation/${store.user?.id}/`, 'GET', store.tokens?.access,)
    
    const navigate = useNavigate()

    useEffect(() => {
        if(!store.isLogged){
            navigate('/')
            return
        }
        
    }, [store?.isLogged])

    useEffect(()=>{
        if(data){
            setReservations(data)
        }
    },[data])

    const handleDeleteReservation = (e) => {
        const id = e.target.id
        fetch(`${import.meta.env.VITE_URL_API}/reservation/delete/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.tokens.access}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if(data.error){
                toast.error(data.error)
                return
            }
            toast.success('Reservation deleted')
            
            setReservations(data.reservations)
        })
    }


    if(error){
        toast.error(error.message)
    }

    if(loading){
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        )
    }
   
    if(reservations){
        return (
            <section className="w-screen h-[90vh] p-4">
                <div className="h-full flex flex-col">
                    <div className=" w-full h-20">
    
                    </div>
    
                    <div className=" w-full h-full flex flex-col overflow-hidden overflow-y-auto items-center">
                        <h1 className="text-3xl">Reservations</h1>
                        <div className="w-full h-full flex flex-col gap-4 items-center">
                            {
                                reservations.map((reservation, index) => {
                                    return (
                                        <div key={index} className="w-full h-20 bg-black bg-opacity-60 rounded-xl p-4 flex justify-between items-center text-white">
                                            <p>Locator: {reservation.locator}</p>
                                            <p>Hotel {reservation.hotel.name}</p>
                                            <p>Check in{reservation?.init_date}</p>
                                            <p>Check out{reservation?.end_date}</p>
                                            <p>Amount ${reservation.amount}</p>
                                            <button className="btn bg-red-600 border-0" id={reservation.id} onClick={handleDeleteReservation}>Delete</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                        
                    </div>
                </div>
            </section>
        )
    }
}