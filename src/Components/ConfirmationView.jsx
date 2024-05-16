import { useNavigate } from "react-router-dom"
import useAppContext from "../ContextManagment/AppContext"

export const ConfirmationView = () => {

    const {actions, store} = useAppContext()
    const navigate = useNavigate()
    const handleGoHome = () => {
        actions.clearReservation()
        navigate('/')
    }
    return(
        <section className="w-screen h-[80vh] bg-transparent text-white flex justify-center items-center ">
                <div className="bg-black opacity-[60%] w-[60vw] h-[80vh] rounded-2xl p-6">
                    <div className="flex justify-center flex-col items-center">
                        <h1 className="text-white text-3xl">Reservation Successfully</h1>
                        <p className="text-white text-xl">Your reservation has been successfully processed</p>
                    </div>
                    <div className="w-full">
                        <h2 className="text-white text-2xl">Reservation Details</h2>
                        <p className="mt-2">Locator: {store.createdReservation?.locator}</p>
                        <h3 className="text-white text-xl mt-3 w-full text-center">Customers</h3>
                        <div className="flex justify-around">
                            {store.createdReservation?.customers?.map((user, index) =>{
                                return(
                                    <div key={index} className="flex flex-col gap-3">
                                        <p className="text-white text-lg">Name: {user?.first_name} {user?.last_name}</p>
                                        <p className="text-white text-lg">Email: {user?.email}</p>
                                    </div>
                                )
                            
                            })
                            }     
                        </div>
                        <div className="w-full">
                            <h3 className="text-white text-xl mt-3 w-full text-center">Reservation</h3>
                            <div className="flex justify-start">
                                <div className="w-[50%] p-8">
                                    <h3 className="text-white text-xl">Hotel {store.createdReservation?.hotel?.name}</h3>
                                    <p className="text-white text-lg">Address: {store.createdReservation?.hotel?.address}</p>
                                    <p className="text-white text-lg">City: {store.createdReservation?.hotel?.city}</p>
                                    <p className="text-white text-lg">State: {store.createdReservation?.hotel?.state}</p>
                                    <p className="text-white text-lg">Phone: {store.createdReservation?.hotel?.phone}</p>
                                    <p className="text-white text-lg">Email: {store.createdReservation?.hotel?.email}</p>

                                </div>
                                <div className="w-[50%] p-8">
                                    <p className="text-white text-lg">Check-in: {store.createdReservation?.init_date}</p>
                                    <p className="text-white text-lg">Check-out: {store.createdReservation?.init_date}</p>
                                    <p className="underline">Services:</p>
                                    {
                                    store.createdReservation?.services.map((service) => {
                                        return(
                                                <p key={service?.id} className="text-white text-lg">{service?.name}</p>
                                          
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-auto" onClick={handleGoHome}>
                            <button className="btn w-[16rem] ms-auto me-auto bg-green-400">Go to Home</button>   
                        </div>

                    </div>
                </div>
            </section>
        )
    
}