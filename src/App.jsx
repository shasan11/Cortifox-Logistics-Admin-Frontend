import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Authentication/Login'
import CheckAuthentication from './helper/Authentication/checkAuthentication'
import UserGroup from './routes/router'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import "ag-grid-enterprise";

function App() {
  const [count, setCount] = useState(0)
  const auth=CheckAuthentication()
  return (
    <>
    <BrowserRouter> 
    {auth?
    <><UserGroup/></>
    : <Login/>}
    </BrowserRouter>   
    </>
  )
}

export default App
