import toast from "react-hot-toast"
import { useFetch } from "../Hooks/useFetch"
import { useState } from "react"


export const RoomsAvailable = () => {

    const {loading, data, error} = useFetch(`${import.meta.env.VITE_URL_API}/room/availables/?hotel=1&init_date=2024-10-17&end_date=2024-10-18`)

    const [showRoomDetail, setShowRoomDetail] = useState(false)
    const [detail, setDetail] = useState()
    

    const handleShowDetail = (event) => {
        const id = event.target.id
        if(!id) return
        if(showRoomDetail) return
        setShowRoomDetail(true)

        const room = data?.available?.find(room => room.id == id)
        console.log(room)
        setDetail(room)
        
    }

    const handleHideDetail = (event) => {
        
        if(!showRoomDetail) return
        setShowRoomDetail(false)
    }
   
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
    
                <div className="flex flex-no-wrap justify-start gap-4 p-8" >
                    {data?.available?.map((room, index) => (
                        <div id={room.id} key={index} className="card w-96 h-62 bg-base-100 shadow-xl image-full hover:-translate-y-3 border-0" onMouseOver={handleShowDetail} onMouseLeave={handleHideDetail}>
                            <figure><img src="https://th.bing.com/th/id/R.af2f9ca645743af637cf120723573ffe?rik=5MW4ervdkavFiA&pid=ImgRaw&r=0" alt="Shoes" /></figure>
                            <div id={room.id} onMouseOver={handleShowDetail} className="card-body">
                            <h2 className="card-title">{room.name}</h2>
                            <p></p>
                            <div className="card-actions justify-end">
    
                                <span className="btn bg-black opacity-[60%] border-0 text-white">$ {room.price}</span>
                            </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <div className={`w-full h-[19rem] bg-black opacity-[60%] rounded-xl flex gap-8 ${showRoomDetail ? 'block': 'hidden'}`}>
                    <div className="text-white p-4 flex flex-col gap-3 text-lg">
                        <h3 className="font-bold text-2xl"><i className="fa-solid fa-hotel"></i> {detail?.hotel.name || ''}</h3>
                        
                        <p><i className="fa-solid fa-star"></i>  {detail?.hotel.stars || ''}</p>
                        <p><i className="fa-solid fa-person-shelter"></i> {detail?.name || ''}</p>
                        <p><i className="fa-solid fa-money-check-dollar"></i>  {detail?.price || ''}</p>
                        <p><i className="fa-solid fa-user-group"></i>  {detail?.max_customers}</p>
                    </div>
                    <div className="text-white text-lg w-[30rem] p-4">
                        <h3 className="font-bold text-2xl">Description</h3>
                        <p className="mt-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi dolorum natus incidunt eum architecto labore quia quaerat numquam vitae obcaecati sit aliquid quod blanditiis, aut sapiente hic quidem maiores voluptates?</p>
                    </div>

                    <div className="text-white text-lg w-[15rem] p-4">
                        <h3 className="font-bold text-2xl">Services</h3>
                        <p><i className="fa-solid fa-wind"></i> Air Aconditioning</p>
                        <p><i className="fa-solid fa-person-swimming"></i> Swimming pool</p>
                        <p><i className="fa-solid fa-utensils"></i> Restaurant</p>
                        <p><i className="fa-solid fa-wifi"></i> Wifi</p>
                        <p><i className="fa-solid fa-guitar"></i> Show</p>
                    </div>

                    <div className="text-white text-lg w-[20rem] p-4">
                        <h3 className="font-bold text-2xl"></h3>
                        <p className="mt-8"><i className="fa-solid fa-parking"></i> Parking</p>
                        <p><i className="fa-solid fa-tv"></i> TV</p>
                        <p><i className="fa-solid fa-coffee"></i> Coffee</p>
                        <p><i className="fa-solid fa-dog"></i> Pets</p>
                        <p><i className="fa-solid fa-wheelchair"></i> Wheelchair Access</p>
                    </div>
                </div>
                
            </section>
        )
    }
}