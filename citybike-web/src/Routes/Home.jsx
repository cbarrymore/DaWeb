import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { userRoles } from "../data/userRoles"
import { appCard } from "../utils/ComponentsStyles"
import "../utils/generalStyles.css"
import { useAuth } from "../hooks/useAuth"

const HomeRol = ({rol}) => {
  if(rol === userRoles.gestor)
    return (
  <Container style={appCard}>
    <Row className="p-5">
      <Col>
        <p>Gestiona las estaciones de la aplicación</p>
        <Button className="boton" variant="primary" as={Link} to="/estaciones">Estaciones</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <p>Gestiona los usuarios de la aplicación</p>
        <Button className="boton mb-5" variant="primary" as={Link} to="/usuarios">Usuarios</Button>
      </Col>
    </Row>
  </Container>
  )
  else if(rol===userRoles.usuario)
  {
    return (
      <Container style={appCard} >
        <Row>
          <Col className="p-5">
            <p className="home-text">Mira las estaciones que se te ofrecen en Citybike</p>
            <Button className="boton" variant="primary" as={Link} to="/estaciones">Estaciones</Button>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <p>Mira si tienes una reserva</p>
            <Button className="boton" variant="primary" as={Link} to="/reservas">Reservas</Button>
          </Col>
          <Col>
            <p>Gestiona tu alquiler y mira los anteriores</p>
            <Button className="boton" variant="primary" as={Link} to="/alquileres">Alquileres</Button>
          </Col>
        </Row>
      </Container>
    )
  }
  else
  {
    return(
      <Container style={appCard}>
        <Row className="p-5">
          <Col>
            <p>
              Unete a la comunidad de Citybike
            </p>
            <Button className="boton" variant="primary" as={Link} to="/registrarse">Registrarse</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              ¿Ya tienes cuenta? Inicia Sesión
            </p>
            <Button className="boton mb-5" variant="primary" as={Link} to="/login">Login</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export const Home = () => {
  const { user, logout, role } = useAuth()
  return (
    <Container className="mt-5">
    <Row className="justify-content-center mb-3">
      <Col md={8} className="text-center">
        <h1>Welcome to Citybike</h1>
        <h2>
          Your one-stop solution for renting bicycles in the city. 
        </h2>
        <h3>
        Enjoy our wide range of bikes for all your needs.
        </h3>
      </Col>
    </Row>
    <HomeRol rol={role}/>
  </Container>
  )
}
