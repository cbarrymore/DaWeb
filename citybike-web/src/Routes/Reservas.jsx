import { Button, Container, Row, Table } from "react-bootstrap"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useContext, useEffect, useState } from "react"
import Gateway from "../configs/constants"
import Swal from "sweetalert2"
import {buttonStyle, buttonNegativeStyle} from "../utils/ComponentsStyles"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import { cancelarReserva, confirmarReserva, fetchUserInfo } from "../apis/AccessAlquileres"
import LoadingModal from "../components/LoadingModal"

export const Reservas = () => {
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", null)
  const token = localStorage.getItem("token")
  const idUser = localStorage.getItem("id")
  const {reservas,setReservas,alquiler,setAlquiler,updateUserContext} = useContext(UserContext)
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
      setLoading(true)
      updateUserContext()
      setLoading(false)
  },[update])

  

  const handleConfirmarReserva = async (idReserva) => {
    setLoading(true)
    confirmarReserva().then(() => {
      fetchUserInfo().then((data) => {
        setUserInfo(data)
        setReservas(data.reservas)
        let alquilerActivo = data.alquileres.find((alquiler) => alquiler.fin === null || alquiler.fin === "")[0]
        if (alquilerActivo) setAlquiler(alquilerActivo)
          setUpdate(!update)
      })
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al confirmar la reserva" + error,
      })
    }).finally(() => setLoading(false))
    
  }

  const handleCancelarReserva = async () => {
    setLoading(true)
    cancelarReserva().then(() => {
      setTimeout(() => {
        fetchUserInfo().then((data) => {
          setUserInfo(data)
          setReservas(data.reservas)
          setUpdate(!update)
        })
      }, 3000);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cancelar la reserva" + error,
      })
    }).finally(() => setLoading(false))
    
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
                  <Button className="mx-1" onClick={() => handleConfirmarReserva()} style={buttonStyle}>
                    Confirmar
                  </Button>
                  <Button className="mx-1" onClick={() => handleCancelarReserva()} style={buttonNegativeStyle}>
                    Cancelar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <LoadingModal show={loading} />
    </Container>
  )
}
