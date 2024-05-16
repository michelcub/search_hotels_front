import { useEffect, useState } from "react"
import toast from "react-hot-toast"



export const useFetch = (url, method='GET', token=null, dataBody=null) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

   



    useEffect(()=>{
        fetch(url,{
            method: method,
            headers:{
                // 'Autorization': 'Bearer ' + token, 
                'Content-Type': 'aplications/json'
            },
            body: dataBody
        })
        .then((res)=> {
            if(!res.ok) throw Error('Error en la petición')
            return res.json()
        })
        .then(data => {
            if(data.error){
                toast.error(data.error)
            }
            setData(data)
        })
        .catch(err => setError(err))
        .finally(()=> setLoading(false))
    },[])
    
    return {
        loading,
        data,
        error
    }
}