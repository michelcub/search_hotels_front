import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import { Header } from "./Components/Header"
import './App.css'
import { SearchView } from './Pages/SearchView'
import { HotelView } from './Pages/HotelView'
import { LoginView } from './Pages/Login';
import useLoginContext from './ContextManagment/LoginContext';
import { AdminView } from './Pages/AdminView';

export default function App() {

  


  return (
    

    <section className="w-screen h-screen app">
      <Toaster/>

      <BrowserRouter basename='/'>
        <Header/>
        <Routes>
          <Route path='/' element={<SearchView/>}/>
          <Route path='/hotel' element={<HotelView/>}/>
          <Route path='/login' element={<LoginView/>}/>
          <Route path='/admin' element={<AdminView/>}/>
          <Route path='*' element={<h1>Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </section>

  )
}