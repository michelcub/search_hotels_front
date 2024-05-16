import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Appprovider } from './ContextManagment/AppContext.jsx'
import { LoginProvider } from './ContextManagment/LoginContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <LoginProvider>
      <Appprovider>
        <App />
      </Appprovider>
    </LoginProvider>
  
)
