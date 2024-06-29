import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { DebugComponent } from "./components/ContextValues"
import { Col, Container, Nav, Navbar, Row, Stack } from "react-bootstrap"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Layout.css"
import Banner from "./components/Banner"
import { useAuth } from "./hooks/useAuth"

const MainContent = () => {
  const { user, logout, role } = useAuth()
  return (
    <div className="bg-white flex-fill main-content-div d-lg-flex align-self-lg-center align-items-lg-center justify-content-lg-center min-vh-100" >
      <div className="p-2 d-lg-none d-flex text-white bg-success banner">
        <a
          href="#"
          className="text-white"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
        >
          <i className="fa-solid fa-bars"></i>
        </a>
        <div className="ms-3">Citybike</div>
        <div className="ms-auto d-flex justify-content-top">
          <span>
            <h6 className="">Usuario: {user}</h6>
            <h6 className="">Rol: {role}</h6>
          </span>
        </div>
      </div>

      <div className="p-4">
        <hr />
        <Row>
          <Col>
            <Outlet/>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export const Layout = () => {
  return (
    <Container fluid className="p-0 d-flex h-100" style={{ width: "100vw"}}>
      <Sidebar />
      <MainContent />
    </Container>
  )
}

;<div className="container-fluid p-0 d-flex h-100" style={{ width: "100vw" }}>
  <div
    id="bdSidebar"
    className="d-flex flex-column flex-shrink-0 p-3 bg-success text-white offcanvas-md offcanvas-start"
  >
    <a href="#" className="navbar-brand"></a>
    <hr />
    <ul className="mynav nav nav-pills flex-column mb-auto">
      <li className="nav-item mb-1">
        <a href="#">
          <i className="fa-regular fa-user"></i>
          Profile
        </a>
      </li>

      <li className="nav-item mb-1">
        <a href="#">
          <i className="fa-regular fa-bookmark"></i>
          Saved Articles
          <span className="notification-badge">5</span>
        </a>
      </li>
      <li className="nav-item mb-1">
        <a href="#">
          <i className="fa-regular fa-newspaper"></i>
          Articles
        </a>
      </li>
      <li className="nav-item mb-1">
        <a href="#">
          <i className="fa-solid fa-archway"></i>
          Institutions
        </a>
      </li>
      <li className="nav-item mb-1">
        <a href="#">
          <i className="fa-solid fa-graduation-cap"></i>
          Organizations
        </a>
      </li>

      <li className="sidebar-item  nav-item mb-1">
        <a
          href="#"
          className="sidebar-link collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#settings"
          aria-expanded="false"
          aria-controls="settings"
        >
          <i className="fas fa-cog pe-2"></i>
          <span className="topic">Settings </span>
        </a>
        <ul
          id="settings"
          className="sidebar-dropdown list-unstyled collapse"
          data-bs-parent="#sidebar"
        >
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="fas fa-sign-in-alt pe-2"></i>
              <span className="topic"> Login</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="fas fa-user-plus pe-2"></i>
              <span className="topic">Register</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="fas fa-sign-out-alt pe-2"></i>
              <span className="topic">Log Out</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
    <hr />
    <div className="d-flex justify-content-center">
      <span>
        <h6 className="mt-1 mb-0  ">Citybike</h6>
      </span>
    </div>
  </div>

  <div className="bg-light flex-fill">
    <div className="p-2 d-md-none d-flex text-white bg-success">
      <a
        href="#"
        className="text-white"
        data-bs-toggle="offcanvas"
        data-bs-target="#bdSidebar"
      >
        <i className="fa-solid fa-bars"></i>
      </a>
      <span className="ms-3">GFG Portal</span>
    </div>
    <div className="p-4">
      <nav style={{ "--bs-breadcrumb-divider": "'>'", fontSize: "14px" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <i className="fa-solid fa-house"></i>
          </li>
          <li className="breadcrumb-item">Learning Content</li>
          <li className="breadcrumb-item">Next Page</li>
        </ol>
      </nav>

      <hr />
      <div className="row">
        <div className="col">
          <p>Page content goes here</p>
        </div>
      </div>
    </div>
  </div>
</div>

// ;<Container>
//   <Row>
//     <Col md="auto" id="sidebar">
//       <Sidebar />
//     </Col>
//     <Col md="auto">
//       <Row>
//         <Col>
//           <DebugComponent />
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <Outlet />
//         </Col>
//       </Row>
//     </Col>
//   </Row>
// </Container>
