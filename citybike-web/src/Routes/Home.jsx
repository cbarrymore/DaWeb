import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./Home.css"

export const Home = () => {
  return (
    <Container className="mt-5">
    <Row className="justify-content-center">
      <Col md={8} className="text-center">
        <h1>Welcome to Citybike</h1>
        <p>
          Your one-stop solution for renting bicycles in the city. Enjoy our wide range of bikes for all your needs.
        </p>
        <Button variant="primary" as={Link} to="/login">Login</Button>
      </Col>
    </Row>
  </Container>
  )
}
