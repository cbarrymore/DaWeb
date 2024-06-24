import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

const OpcionesRol = ({rol, estacion, navigate, onDelete}) =>
  {
    if(rol === "gestor")
      {
        return (
          <td>
          <Button onClick={() =>
                  navigate(`/estaciones/editar/${estacion.id}`, { replace: true })}>Editar</Button>
          <Button onClick={() => onDelete(estacion.id)}>Eliminar</Button>
          </td>)
      }
    else if(rol === "usuario")
      {
        return (
          <td>
          <button onClick={() =>
                  navigate(`/estaciones/${estacion.id}`, { replace: true })}>Ver</button>
          </td>)
      }
  }

const TablaEstaciones = ({ estaciones, onDelete }) => {
  const navigate = useNavigate()
  const rol = localStorage.getItem("role")
  return (
    <Table >
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Dirección Postal</th>
          <th>Bicicletas Disponibles</th>
          <th>Fecha de Alta</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {estaciones.map((estacion) => (
          <tr key={estacion.id}>
            <td>{estacion.nombre}</td>
            <td>{estacion.dirPostal}</td>
            <td>{estacion.bicisDisponibles}</td>
            <td>{estacion.fechaAlta}</td>
            <OpcionesRol rol = {rol} estacion = {estacion} navigate={navigate} onDelete={onDelete}/>
            <td>
              <Button
                onClick={() =>
                  navigate(`/estaciones/${estacion.id}`, { replace: true })
                }
              >
                Ver
              </Button>
              <Button onClick={() => test(estacion.id)}> Test </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
const test = (id) => {
  const myHeaders = new Headers()
  const token = localStorage.getItem("token")
  myHeaders.append(
    "Authorization",
    `Bearer ${token}`
  )

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  fetch(
    `http://localhost:8070/estaciones/${id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
}

export default TablaEstaciones
