import { useContext, useEffect, useState } from "react"
import Gateway from "../configs/constants"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap"
import {buttonStyle} from "../utils/ComponentsStyles"
import TablaEstaciones from "../components/TablaEstaciones"
import { fetchEstaciones } from "../apis/AccessEstaciones"
import { EstacionesPaginada } from "../components/EstacionesPaginadas"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import LoadingModal from "../components/LoadingModal"

const DialogEstacionesDejarBicicleta = ({ show, handleClose }) => {
  // const [estaciones, setEstaciones] = useState([])

  // useEffect(() => {
  //   const data = fetchEstaciones()
  //   setEstaciones(data)
  // }, [])
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Estaciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EstacionesPaginada filters={false} />
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const Alquileres = () => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")
  const idUser = localStorage.getItem("id")
  const { alquiler, setAlquiler, historialAlquileres, setHistorialAlquileres,updateUserContext } =
    useContext(UserContext)
  const navigate = useNavigate()

  const handleClose = () => setShow(false)

  useEffect(() => {
      setLoading(true)
      updateUserContext()
      setLoading(false)
  }, [idUser, token])

  

  return (
    <Container fluid>
      <Row>
        <h1>Alquileres</h1>
        <h2>Alquiler activo</h2>
      </Row>
      {alquiler !== null ? (
        <Row xs="auto" className="mb-3">
          <Col>
            <TablaAlquileres alquileres={[alquiler]} />
          </Col>
          <Col className="align-self-center">
            <Button style={buttonStyle} onClick={() => setShow(true)}>
              Devolver bicicleta
            </Button>
          </Col>
        </Row>
      ) : (
        <Container className="mb-4">
          <Row>
            <p>No hay alquileres activos</p>
          </Row>
          <Row>
            <Button style={buttonStyle} onClick={() => navigate("/estaciones")}>
              Alquilar bicicletas
            </Button>
          </Row>
        </Container>
      )}
      <h2>Historial de alquileres</h2>
      {historialAlquileres.length === 0 ? (
        <p>No hay historial de alquileres</p>
      ) : (
        <TablaAlquileres alquileres={historialAlquileres} />
      )}

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Estaciones </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EstacionesPaginada filters={false} />
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <LoadingModal show={loading} />
    </Container>
  )
}

const TablaAlquileres = ({ alquileres }) => {
  return (
    <Table striped bordered hover responsive className="mt-2">
      <thead>
        <tr>
          <th>Id</th>
          <th>Fecha creación</th>
          <th>Bicicleta</th>
          <th>Fecha de fin</th>
        </tr>
      </thead>
      <tbody>
        {alquileres?.map((alquiler) => (
          <tr key={alquiler.id}>
            <td>{alquiler.id}</td>
            <td>{alquiler.inicio}</td>
            <td>{alquiler.idBici}</td>
            <td>{alquiler.fin}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
