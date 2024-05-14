import { useContext, createContext, useState, act } from "react";

const ApppContext = createContext();

export const Appprovider = ({children}) => {


    const [hotelList, setHotelList] = useState([])
    const [form, setForm] = useState()




    const actions = {
        setHotelList,
        setForm
    }

    const store = {
        hotelList,
        form
    }

    return (
        <ApppContext.Provider value={{actions, store}}>
            {children}
        </ApppContext.Provider>
    );
}

const useAppContext = () => useContext(ApppContext);
export default useAppContext;