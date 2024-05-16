import toast from "react-hot-toast"
import useAppContext from "../ContextManagment/AppContext"
import { RoomsAvailable } from "./RoomsAvailable"
import { SidebarSearch } from "./SidebarSearch"
import { ServicesAvailable } from "./ServicesAvailable"
import { ReservationView } from "./ReservationView"
import { ConfirmationView } from "./ConfirmationView"


export const StepsView = () => {

    const {actions, store} = useAppContext()

    const handleChangeStep = (event) => {
        const step = event.target.id
        actions.setStep(Number(step))
        toast.success(`Step ${step} selected`)
    }

    return (
        <section className="w-screen h-[90vh] bg-transparent flex flex-col justify-center items-center">
            <div className="w-full lg:w-[60vw] flex justify-center">
                <ul className="steps  steps w-full">
                    <button id="1" data-content="🏨" className="step text-white sm:text-2xl step-primary" onClick={handleChangeStep}>Select Room</button>
                    <button id="2" data-content="🛎️" className={`step text-white sm:text-2xl ${store.step >=2 ? 'step-primary': ''}`} onClick={handleChangeStep}>Select Services</button>
                    <button id="3" data-content="👪" className={`step text-white sm:text-2xl ${store.step >=3 ? 'step-primary': ''}`} onClick={handleChangeStep}>Guests</button>
                    <button id="4" data-content="🗸" className={`step text-white sm:text-2xl ${store.step ==4 ? 'step-primary': ''}`} onClick={handleChangeStep}>Finish</button>
                </ul>
            </div>
            {
                store.step === 1 ? (
                    <div className="flex w-screen mt-5">
                        <SidebarSearch/>
                        <RoomsAvailable/>
                    </div>
                ): store.step === 2 ? (
                    <div className="flex w-screen mt-5">
                        <ServicesAvailable/>
                    </div>  
                ): store.step === 3 ?(
                    <div className="flex w-screen mt-5">
                        <ReservationView/>
                    </div>  
                )
                : (
                    <div className="flex w-screen mt-5">
                        <ConfirmationView/>
                    </div>  
                )
            }
            
        </section>
    )
}