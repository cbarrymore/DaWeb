import {Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
export const Layout = () =>{
    return (
    <>
      <h1>Navigation</h1>
      <Navbar />
      <p>
        {/* Current location (index): {location.pathname} ({historyIndex}) */}
      </p>
      <Outlet />
    </>
    )
}