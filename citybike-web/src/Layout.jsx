import {Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { DebugComponent } from "./components/ContextValues"
import {Container, Stack } from "react-bootstrap"
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css"
export const Layout = () =>{
    return (
    <Stack>
      <div className="sidebar">
        <h1  className="header">Citybike</h1>
        <Sidebar />
      </div>
      <div className="content">
        <Outlet />
        <aside>
            <DebugComponent />
        </aside>
      </div>
    </Stack>
    )
}