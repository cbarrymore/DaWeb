import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Button, Container, Nav, Navbar} from "react-bootstrap"
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import {userRoles as ur} from '../data/userRoles.jsx'
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact";
import "../configs/palette.css" 
import "./Navbar.css"

const Sidebar = () => {
  const { user, logout,role } = useAuth()
  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "1.5rem"
  }
  return (
    <Container>
      <Nav.Link className="">
        <Link to="/">Home</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/estaciones" style={linkStyle}>Estaciones</Link>
      </Nav.Link>
      <Nav.Link>
        {user !== null ? (
          <Link onClick={logout} to="/">
            Logout
          </Link>
        ) : (
          <Link to="/login" style={linkStyle}>Login</Link>
        )}
      </Nav.Link>
      <Nav.Link>
        {role !== null && role === ur.gestor ? (
          <Link to="/reservar_alquilar" style={linkStyle}>Reservar/Alquilar</Link>
        ) : console.log(role)}
      </Nav.Link>
    </Container>

  )
}
export default Sidebar

{/* <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Citybike</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link >
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar> */}


{/*  */}

