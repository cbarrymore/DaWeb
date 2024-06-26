import { useContext, useEffect, useState } from "react"
import Gateway from "../configs/constants"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap"
import {appCard, elementTable} from "../utils/ComponentsStyles"
import TablaEstaciones from "../components/TablaEstaciones"
import { fetchEstaciones } from "../apis/AccessEstaciones"
import { EstacionesPaginada } from "../components/EstacionesPaginadas"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import LoadingModal from "../components/LoadingModal"
import "../utils/generalStyles.css"

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
        <Button className="boton" variant="primary" onClick={handleClose}>
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
    <Container  className=" my-5">
      <Row>
        <h1>Alquileres</h1>
      </Row>
      <Container className="p-3 my-3" style={appCard}>
      <h2>Alquiler activo</h2>
      
      {alquiler !== null ? (
        <Container className="d-flex justify-content-center align-items-center">
        <Row xs="auto" className="mb-3 align-items-center">
          <Col>
            <TablaAlquileres alquileres={[alquiler]} />
          </Col>
          <Col className="align-self-center">
            <Button className="boton" onClick={() => setShow(true)}>
              Devolver bicicleta
            </Button>
          </Col>
        </Row>
        </Container>
      ) : (
        <Container className="mb-4">
          <Row>
            <p>No hay alquileres activos</p>
          </Row>
          <Row className="justify-content-center">
            <Button className="botonGrande boton"onClick={() => navigate("/estaciones")}>
              Alquilar bicicletas
            </Button>
          </Row>
        </Container>
      )}
      </Container>
      <Container className="p-3 my-5" style={appCard}>
      <h2>Historial de alquileres</h2>
      {historialAlquileres.length === 0 ? (
        <p>No hay historial de alquileres</p>
      ) : (
        <TablaAlquileres alquileres={historialAlquileres} />
      )}
      </Container>

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
    <div style={{
      maxHeight:  '35vh' ,
      overflowY:  'auto' 
    }}>
    <Table striped bordered hover responsive className="mt-2" >
      <thead>
        <tr>
          <th style={elementTable}>Id</th>
          <th style={elementTable}>Fecha creación</th>
          <th style={elementTable}>Bicicleta</th>
          <th style={elementTable}>Fecha de fin</th>
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
    </div>
  )
}
