import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useFetch = (url, method='GET', token=null, dataBody=null) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',  
                };

                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const options = {
                    method: method,
                    headers: headers,
                    body: dataBody
                };

                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Error en la petición');
                }

                const responseData = await response.json();
                if (responseData.error) {
                    toast.error(responseData.error);
                }

                setData(responseData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method, token, dataBody]); 

    return {
        loading,
        data,
        error
    };
};
