import {Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { DebugComponent } from "./components/ContextValues"
export const Layout = () =>{
    return (
    <>
      <h1>Citybike</h1>
      <Navbar />
      <p>
        {/* Current location (index): {location.pathname} ({historyIndex}) */}
      </p>
      <Outlet />
      <aside>
          <DebugComponent />
      </aside>
    </>
    )
}