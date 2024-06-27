import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap/dist/css/bootstrap.min.css"
import { userRoles as ur } from "../data/userRoles.jsx"
import "../configs/palette.css"
import "./Sidebar.css"
import { useState } from "react"

const Sidebar = () => {
  const { user, logout, role } = useAuth()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const navigate = useNavigate()

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "1.5rem",
  }
  return (
    <Offcanvas
      id="sidebar"
      show={show}
      onHide={handleClose}
      backdrop={false}
      className="d-flex flex-column flex-shrink-0 p-4 bg-success text-white h-100"
      style={{ width: "250px" }}
      responsive="md"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="navbar-brand"></Offcanvas.Title>
      </Offcanvas.Header>
      <div id="logo" className="d-flex justify-content-center" onClick={() => navigate("/")}>
        <span
          className="navbar-brand"
          style={{ fontSize: "2.5rem", color: "white", fontWeight: "bold", cursor: "pointer"}}
        >
        <i className="fa-solid fa-bicycle"></i> 
        </span>
      </div>
      <hr />
      <Nav className="flex-column mb-auto mynav" variant="pills">
        <Nav.Item className="mb-1" id="navitem">
          <Nav.Link className="text-white" onClick={() => navigate("/estaciones")}>
            <i className="fa-solid fa-square-parking"></i>
              Estaciones
          </Nav.Link>
        </Nav.Item>
        {role !== null && role === ur.usuario && (
          <Nav.Item className="mb-1">
            <Nav.Link className="text-white" onClick={() => navigate("/reservas")}>
                Reservas
            </Nav.Link>
          </Nav.Item>
        )}

        {role !== null && role === ur.usuario ? (
          <Nav.Item className="mb-1">
            <Nav.Link className="text-white" onClick={() => navigate("/alquileres")}>
                Alquileres
            </Nav.Link>
          </Nav.Item>
        ) : (
          console.log(role)
        )}
        <Nav.Item className="mb-1">
            {user !== null ? (
              <Nav.Link className="text-white" onClick={() => {logout(); navigate("/")}}>
                <i className="fas fa-sign-out-alt pe-2"></i>
                  Logout
              </Nav.Link>
            ) : (
              <Nav.Link className="text-white" onClick={() => {navigate("/login")}}>
                <i className="fa-solid fa-right-to-bracket"></i>
                  Login
              </Nav.Link>
            )}
        </Nav.Item>
      </Nav>
      <hr />
      <div className="d-flex justify-content-center">
        <span>
          <h6 className="mt-1 mb-0">Citybike</h6>
        </span>
      </div>
    </Offcanvas>
  )
}
export default Sidebar

// <Container>
//   <Nav.Link className="">
//     <Link to="/">Home</Link>
//   </Nav.Link>
//   <Nav.Link>
//     <Link to="/estaciones" style={linkStyle}>Estaciones</Link>
//   </Nav.Link>

//   <Nav.Link>
//     {role !== null && role === ur.usuario ? (
//       <Link to="/reservas" style={linkStyle}>Reservas</Link>
//     ) : console.log(role)}
//   </Nav.Link>
//   <Nav.Link>
//     {role !== null && role === ur.usuario ? (
//       <Link to="/alquileres" style={linkStyle}>Alquileres</Link>
//     ) : console.log(role)}
//   </Nav.Link>

//   <Nav.Link>
//     {user !== null ? (
//       <Link onClick={logout} to="/">
//         Logout
//       </Link>
//     ) : (
//       <Link to="/login" style={linkStyle}>Login</Link>
//     )}
//   </Nav.Link>
// </Container>
