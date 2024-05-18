import { useEffect, useState } from "react";
import useLoginContext from "../ContextManagment/LoginContext";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import toast from "react-hot-toast";



export const AdminView = () => {
    const {actions, store} = useLoginContext();
    const [reservations, setReservations] = useState()
    const {loading, data, error} = useFetch(`${import.meta.env.VITE_URL_API}/reservation/`, 'GET', store.tokens?.access,)
    
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
                    <div className="overflow-x-auto w-[90vw] bg-black h-[90vh] opacity-[60%] rounded-2xl">
                        <table className="table w-full text-white overflow-hidden overflow-y-auto">
                            <thead>
                            <tr className="text-white">
                                <th></th> 
                                <th>Locator</th> 
                                <th>Hotel</th> 
                                <th>Room</th> 
                                <th>username</th> 
                                <th>Check in</th> 
                                <th>Check out</th>
                                <th>Amount</th>
                                <th>Paid</th>
                                <th>Customers</th>
                                <th>Delete</th>
                            </tr>
                            </thead> 
                            <tbody>
                            
                            
                            {
                            reservations?.length ? reservations.map((reservation, index) => (

                                <tr key={reservation?.id}>
                                    <th>{index}</th> 
                                    <td>{reservation?.locator}</td> 
                                    <td>{reservation?.hotel?.name}</td> 
                                    <td>{reservation?.room?.number}</td> 
                                    <td>{reservation?.main_customer.username}</td> 
                                    <td>{reservation?.init_date}</td> 
                                    <td>{reservation?.end_date}</td>
                                    <td>{reservation?.amount}</td> 
                                    <td>{reservation?.is_paid? 'Yes': 'No'}</td>
                                    <td>{reservation?.customers.length}</td>
                                    <td><button id={reservation.id} className="btn btn-error" onClick={handleDeleteReservation}>Delete</button></td>

                                </tr>


                                
                            )): <tr><td colSpan="10">No reservations</td></tr>
                        }
                           
                            </tbody> 
                            {/* <tfoot>
                            <tr>
                                <th></th> 
                                <th>Name</th> 
                                <th>Job</th> 
                                <th>company</th> 
                                <th>location</th> 
                                <th>Last Login</th> 
                                <th>Favorite Color</th>
                            </tr>
                            </tfoot> */}
                        </table>
                        </div>
                        
                    </div>
                </div>
            </section>
        )
    }
}