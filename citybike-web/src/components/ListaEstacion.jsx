import { Link, useNavigate } from "react-router-dom"

const ListaEstacion = ({ estaciones, onEdit, onDelete }) => {
  const navigate = useNavigate()
  return (
    <table>
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
            <td>
              <button onClick={() => onEdit(estacion)}>Editar</button>
              <button onClick={() => onDelete(estacion.id)}>Eliminar</button>
              <button
                onClick={() =>
                  navigate(`/estaciones/${estacion.id}`, { replace: true })
                }
              >
                Ver
              </button>
              <button onClick={() => test(estacion.id)}> Test </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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

export default ListaEstacion
