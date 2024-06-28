import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { userRoles } from "../data/userRoles"

const HomeRol = ({rol}) => {
  if(rol === userRoles.gestor)
    return (
  <Container>
    <Row className="p-5">
      <Col>
        <p>Gestiona las estaciones de la aplicación</p>
        <Button variant="primary" as={Link} to="/estaciones">Estaciones</Button>
      </Col>
    </Row>
  </Container>
  )
  else if(rol===userRoles.usuario)
  {
    return (
      <Container >
        <Row>
          <Col className="p-5">
            <p className="home-text">Mira las estaciones que se te ofrecen en Citybike</p>
            <Button variant="primary" as={Link} to="/estaciones">Estaciones</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Mira si tienes una reserva</p>
            <Button variant="primary" as={Link} to="/reservas">Reservas</Button>
          </Col>
          <Col>
            <p>Gestiona tu alquiler y mira los anteriores</p>
            <Button variant="primary" as={Link} to="/alquileres">Alquileres</Button>
          </Col>
        </Row>
      </Container>
    )
  }
  else
  {
    return(
      <Container >
        <Row className="p-5">
          <Col>
            <p>
              Unete a la comunidad de Citybike
            </p>
            <Button variant="primary" as={Link} to="/registrarse">Registrarse</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              ¿Ya tienes cuenta? Inicia Sesión
            </p>
            <Button variant="primary" as={Link} to="/login">Login</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export const Home = () => {
  const rol = localStorage.getItem("role")
  return (
    <Container className="mt-5">
    <Row className="justify-content-center">
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
    <HomeRol rol={rol}/>
  </Container>
  )
}
