import toast from "react-hot-toast"
import { useFetch } from "../Hooks/useFetch"
import { useEffect, useState } from "react"
import useAppContext from "../ContextManagment/AppContext"


export const RoomsAvailable = () => {
    const{actions, store} = useAppContext()
    let hotel = store.hotelList.find(hotel => hotel.name == store.form?.hotel)

    const {loading, data, error} = useFetch(`${import.meta.env.VITE_URL_API}/room/availables/?hotel=${hotel?.id}&init_date=${store?.form?.init}&end_date=${store.form?.end}&max_customers=${store.form?.customer}`)

    const [showRoomDetail, setShowRoomDetail] = useState(false)
    const [detail, setDetail] = useState()
    

   



    useEffect(()=>{
        if(data){
            actions.setRoomList(data.available)
        }
    },[data])


    const handleShowDetail = (event) => {
        const id = event.target?.id
        if(!id) return
        if(showRoomDetail) return
        setShowRoomDetail(true)

        const room = data?.available?.find(room => room.id == id)
       
        setDetail(room)
        
    }

    const handleSelectRoom = (event) => {
        const id = event.target.id
        console.log(id)
        const room = data?.available?.find(room => room.id == id)
        console.log(room, 'room')
        actions.setRoomSelected(room)
        console.log(store.roomSelected, 'room selected')
        toast.success(`Room ${room.name.toUpperCase()} selected`)
        toast.success(`Room ${room.name.toUpperCase()} selected`)
        actions.setStep(2)
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
            <section className=" h-[80vh] bg-transparent p-10 w-[90rem] overflow-y-hidden overflow-x-hidden">
                <h1 className="text-white text-3xl mt-5 ms-8 font-bold shadow-2xl ">Rooms Available</h1>
                
                <div className="flex  justify-start gap-4 w-[90rem] min-h-72 overflow-y-hidden overflow-x-auto p-4 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-transparent h-32 overflow-y-scroll" >
                    {data?.available?.map((room, index) => (
                        <div 
                        id={room.id} 
                        key={index} 
                        className="card min-w-96 h-56 bg-base-100 shadow-xl image-full hover:-translate-y-3 border-0" 
                        onMouseOver={handleShowDetail} 
                        onMouseLeave={handleHideDetail}
                        onClick={handleSelectRoom}
                        >
                            <figure id={room.id} onClick={handleSelectRoom}><img className="w-96 h-56" src={room?.img} alt="Shoes" /></figure>
                            <div id={room.id} onMouseOver={handleShowDetail} onClick={handleSelectRoom} className="card-body">
                            <h2 className="card-title">{room.name.toUpperCase()}</h2>
                            <p></p>
                            <div className="card-actions justify-end">
    
                                <span className="btn bg-black opacity-[60%] border-0 text-white">$ {room.price}</span>
                                <span id={room.id} onClick={handleSelectRoom} className="btn bg-success opacity-[60%] border-0 text-white">Add</span>
                            </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <div className={`w-full h-[19rem] bg-black opacity-[60%] rounded-xl flex gap-8 ${showRoomDetail ? 'block': 'hidden'}`}>
                    <div className="text-white p-4 flex flex-col gap-3 text-lg">
                        <h3 className="font-bold text-2xl"><i className="fa-solid fa-hotel"></i> {detail?.hotel.name.toUpperCase() || ''}</h3>
                        
                        <p><i className="fa-solid fa-star"></i>  {detail?.hotel.stars || ''}</p>
                        <p><i className="fa-solid fa-person-shelter"></i> {detail?.name.toUpperCase() || ''}</p>
                        <p><i className="fa-solid fa-money-check-dollar"></i> $  {detail?.price || ''}</p>
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