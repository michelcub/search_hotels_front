import { Link, useNavigate } from "react-router-dom";
import useLoginContext from "../ContextManagment/LoginContext";
import { useEffect } from "react";

export const Header = ()=>{

    const {actions, store} = useLoginContext();
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('tokens')){
            const tokens = JSON.parse(localStorage.getItem('tokens'));
            actions.decodeToken(tokens?.access);
            actions.setTokens(tokens)
            actions.setIsLogged(true);
            
        }
    }, [])

    useEffect(() => {
        if(!store.isLogged){

            console.log('isNotLogged')
            navigate('/')
        }
        if(store.isLogged){
            if(store.user?.is_superuser){
                console.log('isSuperUser')
                navigate('/admin')
            }else{
                console.log('isUser')
                navigate('/profile')
            }
        }
    }, [store.isLogged])
    return(
        <div className="navbar bg-transparent">
          <div className="flex-1">
            <Link className="btn btn-ghost text-3xl text-white" to={'/'}><i className="fa-solid fa-hotel"></i> Easy Hotel</Link>
          </div>
          <div className="flex gap-3 items-center">

           

            <Link className='text-lg text-white' to="/hotel" >Reservation</Link>

            
            
            {
              store?.isLogged? (<div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  {/* <li><a>Settings</a></li> */}
                  <li onClick={actions.logout}><a>Logout</a></li>
                </ul>
              </div>):(<Link className='text-lg text-white' to="/login" >Login</Link>)
            }

          </div>
        </div>
    )
}