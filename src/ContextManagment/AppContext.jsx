import { useContext, createContext, useState, act } from "react";

const ApppContext = createContext();

export const Appprovider = ({children}) => {


    const [hotelList, setHotelList] = useState([])
    const [form, setForm] = useState()
    const [roomSelected, setRoomSelected] = useState()
    const [serviceList, setServiceList] = useState()
    const [step, setStep] = useState(1)


    const actions = {
        setHotelList,
        setForm,
        setRoomSelected,
        setStep,
        setServiceList
    }

    const store = {
        hotelList,
        form,
        roomSelected,
        step,
        serviceList
    }

    return (
        <ApppContext.Provider value={{actions, store}}>
            {children}
        </ApppContext.Provider>
    );
}

const useAppContext = () => useContext(ApppContext);
export default useAppContext;