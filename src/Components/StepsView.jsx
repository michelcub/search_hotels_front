import { RoomsAvailable } from "./RoomsAvailable"
import { SidebarSearch } from "./SidebarSearch"


export const StepsView = () => {
    return (
        <section className="w-screen h-[90vh] bg-transparent flex flex-col justify-center items-center">
            <div className="w-full lg:w-[60vw] flex justify-center">
                <ul className="steps  steps w-full">
                    <li data-content="🏨" className="step text-white sm:text-2xl step-primary">Select Room</li>
                    <li data-content="🛎️" className="step text-white sm:text-2xl ">Select Services</li>
                    <li data-content="👪" className="step text-white sm:text-2xl">Guests</li>
                    <li data-content="🗸" className="step text-white sm:text-2xl">Finish</li>
                </ul>
            </div>
            <div className="flex w-screen mt-5">
                <SidebarSearch/>
                <RoomsAvailable/>
            </div>
            
        </section>
    )
}