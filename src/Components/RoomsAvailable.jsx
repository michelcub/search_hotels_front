import toast from "react-hot-toast"
import { useFetch } from "../Hooks/useFetch"


export const RoomsAvailable = () => {

    const {loading, data, error} = useFetch(`${import.meta.env.VITE_URL_API}/room/availables/?hotel=1&init_date=2024-10-17&end_date=2024-10-18`)
   
    if (error) toast.error(error.message)

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
        return (
            <section className="w-full h-[80vh] bg-transparent p-10">
                <h1 className="text-white text-3xl mt-5 ms-8 font-bold shadow-2xl">Rooms Available</h1>
    
                <div className="flex flex-no-wrap justify-start gap-4 p-8" onM>
                    {data?.available?.map((room, index) => (
                        <div key={index} className="card w-96 h-62 bg-base-100 shadow-xl image-full hover:-translate-y-3 border-0">
                            <figure><img src="https://th.bing.com/th/id/R.af2f9ca645743af637cf120723573ffe?rik=5MW4ervdkavFiA&pid=ImgRaw&r=0" alt="Shoes" /></figure>
                            <div className="card-body">
                            <h2 className="card-title">{room.name}</h2>
                            <p></p>
                            <div className="card-actions justify-end">
    
                                <span className="btn bg-black opacity-[60%] border-0 text-white">{room.price}</span>
                            </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </section>
        )
    }
}