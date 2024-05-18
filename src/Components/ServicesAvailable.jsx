import toast from "react-hot-toast"
import { useFetch } from "../Hooks/useFetch"
import useAppContext from "../ContextManagment/AppContext"
import { useEffect } from "react"

export const ServicesAvailable = () => {

    const {actions, store} = useAppContext()
    const hotel = store?.hotelList.find(hotel => hotel.name == store.form?.hotel)
    const {loading, data, error} = useFetch(`${import.meta.env.VITE_URL_API}/hotel/${hotel?.id}/services/`)


    const handleNextStep = () => {
        actions.setStep(3)
    }


    const handleAddService = (event) => {
        const service = event.target.id;

        const btn = event.target;
        if(btn.classList.contains('btn-primary')){
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-error');
            btn.textContent = 'Remove';
        }else{
            btn.classList.remove('btn-error');
            btn.classList.add('btn-primary');
            btn.textContent = 'Add';
            toast.success(`Service removed`);
            actions.setForm((prev) => {
                return {
                    ...prev,
                    services: prev.services.filter((item) => item !== service)
                };
            })
            return
        }

        if(!store.form?.services){
            actions.setForm((prev) => {
                return {
                    ...prev,
                    services: [service]
                };
            });
            toast.success(`Service added`);
            return;
        }

        if(store.form?.services?.includes(service)){
            toast.error('Service already added')
            return
        }
        
        toast.success(`Service added`);
        actions.setForm((prev) => {
            return {
                ...prev,
                services: [...prev.services, service] || [service] // Agrega el nuevo servicio al array
            };
        });
    };
    

    useEffect(()=>{
        actions.setServiceList(data)
    },[data])


    if (error){
        toast.error(error.message)
        return(
            <section className="w-screen h-[80vh] bg-transparent text-white flex justify-center items-center ">
                <div className="bg-black opacity-[60%] w-[60vw] h-[60vh] rounded-2xl p-6 flex justify-center items-center gap-2">
                    <h1 className="text-3xl font-bold">Error </h1>
                    <p className="text-lg">An error has occurred while loading the services</p>
                </div>
            </section>
        )
    }
    
    if(loading){
        return (
            <div>
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        )
    }

    

    if(data){
        
        return(
            <section className="w-screen h-[80vh] bg-transparent text-white flex justify-center items-center ">
                <div className="bg-black opacity-[60%] w-[60vw] h-[70vh] rounded-2xl p-6">
                    <div className="flex items-center justify-around">
                        <div>
                            <h1 className="text-3xl">Services Available</h1>
                            <p className="text-lg">Select the services you want to include in your reservation</p>
                        </div>
                        <div>
                            <button className="btn bg-green-400 border-0" onClick={handleNextStep}>Next Step</button>
                        </div>
                    </div>
                    <div className="w-full h-[55vh] transparent mt-5 rounded-2xl flex justify-center items-center flex-col gap-3 overflow-x-auto p-6">
                        {data?.map((service) => {
                        return (
                            <div key={service?.id} className={`card card-side bg-base-100 shadow-xl w-full text-white mt-5 h-[10rem]`}>
                                <figure className="w-[18rem]"><img src={service.img} alt="Movie" className="w-[18rem] h-[10rem]"/></figure>
                                <div className="card-body bg-black">
                                <h2 className="card-title">{service.name}</h2>
                                <p>{service.description}</p>
                                <p>$ {service.price}</p>
                                <div className="card-actions justify-end">
                                    <button id={service.id} className="btn btn-primary w-32" onClick={handleAddService}>Add</button>
                                </div>
                                </div>
                            </div>
                            )})
                        }
                    </div>
                </div>
            </section>
        )
    }else{
        return(
            <section className="w-screen h-[80vh] bg-transparent text-white flex justify-center items-center ">
                <div className="bg-black opacity-[60%] w-[60vw] h-[60vh] rounded-2xl p-6">
                    <h1 className="text-3xl">Services Available</h1>
                    <p className="text-lg">Select the services you want to include in your reservation</p>
                    <div className="w-full h-[45vh] transparent mt-5 rounded-2xl flex justify-center items-center">
                        <h2>Not Service Available</h2>
                    </div>
                </div>
            </section>
        )
    }
    
}