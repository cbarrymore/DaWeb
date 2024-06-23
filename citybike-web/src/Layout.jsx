import {Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { DebugComponent } from "./components/ContextValues"
import {Col, Container, Row, Stack } from "react-bootstrap"
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css"
import Banner from "./components/Banner";
export const Layout = () =>{
    return (
    <Container fluid>
      <Row>
        <Col>
          <div className="sidebar">
            <h1  className="header">Citybike</h1>
            <Sidebar />
          </div>
        </Col>
        <Col md="auto">
          <Container className="main-content" fluid>
            <Row>
              <DebugComponent />
            </Row>
            <Row>
              <Outlet />
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
    )
}