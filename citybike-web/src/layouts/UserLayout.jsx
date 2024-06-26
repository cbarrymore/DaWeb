import { useOutlet } from "react-router-dom"
import { AuthProvider, useAuth } from "../hooks/useAuth"
import UserContext from "../contexts/UserContext"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { fetchUserInfo } from "../apis/AccessAlquileres"
import AlquilerModel from "../Models/AlquilerModel"
import ReservaModel from "../Models/ReservaModel"

export const UserLayout = () => {
  const outlet = useOutlet()
  const [reservas, setReservas] = useLocalStorage("reservas", [])
  const [alquiler, setAlquiler] = useLocalStorage("alquiler", null)
  const [historialAlquileres, setHistorialAlquileres] = useLocalStorage(
    "historialAlquileres",
    []
  )
  const { user, id, token, role, login, logout } = useAuth()

  const updateUserContext = () => {
    fetchUserInfo().then((data) => {
      console.log(data)
      let alquileres = data.alquileres.map(
        (alquiler) =>
          new AlquilerModel(
            alquiler.id,
            alquiler.inicio,
            alquiler.fin,
            alquiler.idBici
          )
      )
      console.log(alquileres)
      let alquilerActivo = data.alquileres.find(
        (alquiler) => alquiler.fin === null || alquiler.fin === ""
      )
      console.log(alquilerActivo)
      if (alquilerActivo) setAlquiler(alquilerActivo)
      else setAlquiler(null)
      let historialAlquileres = alquileres.filter(
        (alquiler) => alquiler.fin !== null && alquiler.fin !== ""
      )
      console.log(historialAlquileres)
      setHistorialAlquileres(historialAlquileres)

      let reservas = data.reservas.map(
        (reserva) =>
          new ReservaModel(
            reserva.id,
            reserva.idBici,
            reserva.creada,
            reserva.caducidad
          )
      )
      console.log(reservas)
      if (data.reservas.length > 0) {
        console.log(data.reservas[0])
        setReservas(data.reservas)
      } else {
        setReservas([])
      }
      console.log(reservas)
      console.log(alquiler)
    })
  }

  return (
    <UserContext.Provider
      value={{
        reservas,
        setReservas,
        alquiler,
        setAlquiler,
        updateUserContext,
        historialAlquileres,
        setHistorialAlquileres,
      }}
    >
      {outlet}
    </UserContext.Provider>
  )
}
