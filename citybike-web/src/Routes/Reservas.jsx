import { Button, Container, Row, Table } from "react-bootstrap"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useEffect, useState } from "react"
import Gateway from "../configs/constants"
import Swal from "sweetalert2"
import buttonStyle from "../utils/ComponentsStyles"
import { useNavigate } from "react-router-dom"

export const Reservas = () => {
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", null)
  const token = localStorage.getItem("token")
  const idUser = localStorage.getItem("id")
  const [reservas, setReservas] = useState([])
  const navigate = useNavigate()
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
      setReservas(data.reservas)
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

  const handleConfirmarReserva = async (idReserva) => {
    const uri = Gateway + `/alquileres/usuarios/${idUser}/reservas`
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
        if (response.status === 500) {
          const errorMessage = await response.text()
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
          })
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setUserInfo(data)
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

  const handleCancelarReserva = async (idReserva) => {
    const uri = Gateway + `/alquileres/usuarios/${idUser}/reservas/${idReserva}`
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    }
    try {
      const response = await fetch(uri, requestOptions)
      if (!response.ok) {
        if (response.status === 500) {
          const errorMessage = await response.text()
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
          })
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setUserInfo(data)
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
    <Container>
      <h1>Reservas</h1>
      {reservas.length === 0 ? (
        <Container>
          <Row>
            <p>No hay reservas</p>
          </Row>
          <Row>
            <Button onClick={() => navigate("/estaciones")} style={buttonStyle}>Reservar bicicleta</Button>
          </Row>
        </Container>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Fecha creación</th>
              <th>Bicicleta</th>
              <th>Caducidad</th>
              <th>Acciones</th> {/* Added column for actions */}
            </tr>
          </thead>
          <tbody>
            {reservas?.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.creada}</td>
                <td>{reserva.idBici}</td>
                <td>{reserva.caducidad}</td>
                <td>
                  {/* Added buttons for confirming and canceling reservation */}
                  <Button onClick={() => handleConfirmarReserva(reserva.id)} style={buttonStyle}>
                    Confirmar
                  </Button>
                  <Button onClick={() => cancelReservation(reserva.id)} style={buttonStyle}>
                    Cancelar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}
