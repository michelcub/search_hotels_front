import {BrowserRouter, Routes, Route} from 'react-router-dom'


import { Header } from "./Components/Header"
import './App.css'
import { SearchView } from './Pages/SearchView'

export default function App() {
  return (
    

    <section className="w-screen h-screen app">
      

      <BrowserRouter basename='/'>
        <Header/>
        <Routes>
          <Route path='/' element={<SearchView/>}/>
        </Routes>
      </BrowserRouter>
    </section>

  )
}