import { Button, Container, Row, Table } from "react-bootstrap"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useContext, useEffect, useRef, useState } from "react"
import Gateway from "../configs/constants"
import Swal from "sweetalert2"
import {buttonStyle, buttonNegativeStyle, appCard, elementTable} from "../utils/ComponentsStyles"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import { cancelarReserva, confirmarReserva, fetchUserInfo } from "../apis/AccessAlquileres"
import LoadingModal from "../components/LoadingModal"
import "../utils/generalStyles.css"

export const Reservas = () => {
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", null)
  const token = localStorage.getItem("token")
  const idUser = localStorage.getItem("id")
  const {reservas,setReservas,alquiler,setAlquiler,updateUserContext} = useContext(UserContext)
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const hasPageBeenRendered = useRef(false)

  const navigate = useNavigate()
  useEffect(() => {
      setLoading(true)
      if(!hasPageBeenRendered.current){
        updateUserContext()
        hasPageBeenRendered.current = true
      }
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
        text: "Error al confirmar la reserva" + error.message,
      })
    }).finally(() => setLoading(false))
    
  }

  const handleCancelarReserva = async () => {
    setLoading(true)
    cancelarReserva().then(() => {
      // setTimeout(() => {
        Swal.fire({
          title: "Reserva cancelada",
          text: "Se ha cancelado la reserva correctamente",
          icon: "success",
          confirmButtonText: "Ok"
        })
        fetchUserInfo().then((data) => {
          setUserInfo(data)
          setReservas(data.reservas)
          setUpdate(!update)
        })
        
      // }, 3000);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cancelar la reserva\n" + error.message,
      })
    }).finally(() => {
      setReservas([])
      setLoading(false)
    })
    
  }

  return (
    <><h1>Reservas</h1>
    <Container className="d-flex justify-content-center align-items-center p-5 my-5" style={appCard}>
      
      {reservas.length === 0 ? (
        <Container>
          <Row>
            <p>No hay reservas</p>
          </Row>
          <Row className="justify-content-center">
            <Button className="botonGrande boton" onClick={() => navigate("/estaciones")} >Reservar bicicleta</Button>
          </Row>
        </Container>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={elementTable}>Id</th>
              <th style={elementTable}>Fecha creación</th>
              <th style={elementTable}>Bicicleta</th>
              <th style={elementTable}>Caducidad</th>
              <th style={elementTable}>Acciones</th> {/* Added column for actions */}
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
                  <Button className="mx-1 boton" onClick={() => handleConfirmarReserva()}>
                    Confirmar
                  </Button>
                  <Button className="mx-1 botonCancelar" onClick={() => handleCancelarReserva()}>
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
    </>
  )
}
