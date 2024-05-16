import { useContext, createContext, useState, act, useEffect } from "react";
import toast from "react-hot-toast";

const useLoginContext = () => useContext(LoginContext);


export const LoginProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false);
    const [tokens, setTokens] = useState();
    const [tokenExpitation, setTokenExpitation] = useState();
    const [userId, setUserId] = useState();
    const [user, setUser] = useState();
    const [isSuperUser, setIsSuperUser] = useState(false);

    
   
    

    useEffect(() => {
        const tokens = localStorage.getItem('tokens');
        if(tokens){
            const parsedTokens = JSON.parse(tokens);
            setTokens(parsedTokens);
            decodeToken(parsedTokens.access);
        }
    }, [])
    

    const auth = (form) => {
        fetch(`${import.meta.env.VITE_URL_API}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setIsLogged(true);
            setTokens(data);
            decodeToken(data.access);
            toast.success('Welcome');
            localStorage.setItem('tokens', JSON.stringify(data));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            toast.error('Failed to authenticate. Please try again later.');
        });
    };

    

    const decodeToken = (token) => {
        const payload = token.split('.')[1];
        const decoded = atob(payload);
        const parsedData = JSON.parse(decoded);
        setUserId(parsedData.user_id);
        setTokenExpitation(parsedData.exp);

        getDataUser(parsedData.user_id, token)
        return parsedData;
    }
    

    const getDataUser = (userId, token) => {
        fetch(`${import.meta.env.VITE_URL_API}/user/${userId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data.error){
                toast.error(data.error)
                return
            }
            
            setUser(data)
            if(data.is_superuser){
                setIsSuperUser(true)
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            toast.error('Failed to get user data. Please try again later.');
        });
    }

    const logout = () => {
        setIsLogged(false);
        setTokens(null);
        setTokenExpitation(null);
        setUserId(null);
        setUser(null);
        localStorage.removeItem('tokens');
        
    }

    const actions = {
        setIsLogged,
        setUser,
        auth,
        logout,
        decodeToken,
        setTokens,
        getDataUser,

    };

    const store = {
        isLogged,
        user,
        tokens,
        isSuperUser,
    };

    return (
        <LoginContext.Provider value={{ actions, store }}>
            {children}
        </LoginContext.Provider>
    );
}


export default useLoginContext;
const LoginContext = createContext();