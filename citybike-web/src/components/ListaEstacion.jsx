import { Link, useNavigate } from "react-router-dom"
import { userRoles as ur } from "../data/userRoles"
import { Table, Button, Container, Row, Col } from "react-bootstrap";
function numColumnas(rol)
{
  if(rol == ur.gestor)
  {
    return 2;
  }
  return 1;
}
const OpcionesRol = ({rol, estacion, navigate, onDelete}) =>
  {
    if(rol === ur.gestor)
      {
        return (
          <td>
          <button onClick={() =>
                  navigate(`/estaciones/editar/${estacion.id}`, { replace: true })}>Editar</button>
          <button onClick={() => onDelete(estacion.id)}>Eliminar</button>
          </td>)
      }
  }

  const CrearEstacion = ({rol, navigate}) =>
    {
      if(rol === ur.gestor)
        {
          return (
            <Button onClick={() =>
                    navigate(`/estaciones/editar`, { replace: true })}>+</Button>)
        }
    }

const ListaEstacion = ({ estaciones, onDelete }) => {
  const navigate = useNavigate()
  const rol = localStorage.getItem("role")

  return (
    <Container>
      <Row>
        <Col className="lg">
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección Postal</th>
                <th>Bicicletas Disponibles</th>
                <th>Fecha de Alta</th>
                <th colSpan={numColumnas(rol)}>Acciones</th>
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
          </Table>
        </Col>
        <Col md="auto">
          <CrearEstacion rol={rol} navigate={navigate} />
        </Col>
      </Row>
    </Container>
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
