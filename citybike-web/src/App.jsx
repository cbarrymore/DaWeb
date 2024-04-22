// import { useState } from 'react'

// import {Navbar} from './components/Navbar.jsx'
import './App.css'
import {Home} from './Routes/Home.jsx'
import { About } from './Routes/About.jsx'
import { Contacts } from './Routes/Contacts.jsx'
import { Layout } from './Layout.jsx'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { LoginPage } from './Routes/Login.jsx'
import { AuthLayout } from './AuthLayout.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<AuthLayout/>}>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contacts />} />
      <Route path='login' element={<LoginPage/>}/>
    </Route> 
  </Route>
  ))


function App() {
  // const [user, setUser] = useState(null);

  // const login = (userData) => {
  //   setUser(userData);
  // };

  // const logout = () => {
  //   setUser(null);
  // };


  return (
      <RouterProvider router={router}>
      </RouterProvider>  )
}

export default App
