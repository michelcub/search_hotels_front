import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import { Header } from "./Components/Header"
import './App.css'
import { SearchView } from './Pages/SearchView'
import { HotelView } from './Pages/HotelView'

export default function App() {
  return (
    

    <section className="w-screen h-screen app">
      <Toaster/>

      <BrowserRouter basename='/'>
        <Header/>
        <Routes>
          <Route path='/' element={<SearchView/>}/>
          <Route path='/hotel' element={<HotelView/>}/>
        </Routes>
      </BrowserRouter>
    </section>

  )
}