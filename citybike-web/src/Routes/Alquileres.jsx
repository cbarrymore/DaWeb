import { useEffect, useState } from "react"
import Gateway from "../configs/constants"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap"
import buttonStyle from "../utils/ComponentsStyles"


export const Alquileres = () => {
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", null)
  const token = localStorage.getItem("token")
  const idUser = localStorage.getItem("id")
  const [historialAlquileres, setHistorialAlquileres] = useState([])
  const [alquilerActivo, setAlquilerActivo] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (userInfo === null) {
      fetchUserInfo(idUser)
    }
  }, [userInfo])

  const fetchUserInfo = async (idUser) => {
    const uri = Gateway + `/alquileres/usuarios/${idUser}`
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
    try {
      const response = await fetch(uri, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setUserInfo(data)
      let alquilerActivo = data.alquileres.find((alquiler) => alquiler.fin === null || alquiler.fin === "")
      if (alquilerActivo) {
        setAlquilerActivo(alquilerActivo)
        data.alquileres = data.alquileres.filter((alquiler) => alquiler.id !== alquilerActivo.id)
      }
    setHistorialAlquileres(data.alquileres)
      return data
    } catch (err) {
      if (err.name === "AbortError") {
        alert(
          "Fetch aborted by user action (browser stop button, closing tab, etc."
        )
      } else if (err.name === "TypeError") {
        alert("AbortSignal.timeout() method is not supported")
      } else {
        // A network error, or some other problem.
        alert(`Error: type: ${err.name}, message: ${err.message}`)
      }
    }
  }

  const handleDevolverBicicleta = async () => {
    const uri = Gateway + `/alquileres/usuarios/${idUser}`
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    }
    try {
      const response = await fetch(uri, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setAlquilerActivo(null)
      return data
    } catch (err) {
      if (err.name === "AbortError") {
        alert(
          "Fetch aborted by user action (browser stop button, closing tab, etc."
        )
      } else if (err.name === "TypeError") {
        alert("AbortSignal.timeout() method is not supported")
      } else {
        // A network error, or some other problem.
        alert(`Error: type: ${err.name}, message: ${err.message}`)
      }
    }

  }

  return (
    <Container fluid>
      <Row>
        <h1>Alquileres</h1>
        <h2>Alquiler activo</h2> 
      </Row>
      {alquilerActivo !== null ? (
        <Row xs="auto">
          <Col>
            <TablaAlquileres alquileres={[alquilerActivo]} />
          </Col>
          <Col className="align-self-center">
            <Button style={buttonStyle} onClick={() => setShow(true)}>Devolver bicicleta</Button>
          </Col>
        </Row>
      ) : (
        <p>No hay alquileres activos</p>
      )}
      <h2>Historial de alquileres</h2>
      <TablaAlquileres alquileres={historialAlquileres} />

      <Modal show={show} onHide={handleClose} animation={false} centered size="lg"       >
        <Modal.Header closeButton>
          <Modal.Title>Estaciones </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TablaAlquileres alquileres={historialAlquileres} />
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
    </Container>
  )
}


const TablaAlquileres = ({ alquileres }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Fecha creación</th>
          <th>Bicicleta</th>
          <th>Caducidad</th>
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