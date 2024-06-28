import { Link, useNavigate } from "react-router-dom"
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { userRoles as ur } from "../data/userRoles"
import FormularioEstacion from "./FormularioEstacion";
import { buttonStyle, elementTable, headingTable } from "../utils/ComponentsStyles";

function numColumnas(rol)
{
  if(rol == ur.gestor)
  {
    return 3;
  }
  return 1;
}
const OpcionesRol = ({rol, estacion, navigate, onDelete}) =>
  {
    if(rol === ur.gestor)
      {
        return (
          <>
          <Button className="mx-1" style={buttonStyle} onClick={() =>
                  navigate(`/estaciones/editar/${estacion.id}`, { replace: true })}>Editar</Button>
          <Button className="mx-1" style={buttonStyle} onClick={() => onDelete(estacion.id)}>Eliminar</Button>
          </>)
      }
  }

  const CrearEstacion = ({rol, navigate}) =>
    {
      if(rol === ur.gestor)
        {
          return (
            <Button style={buttonStyle} onClick={() =>
              navigate(`/estaciones/editar`, { replace: true })}>+</Button>)
  
        }
    }

const TablaEstaciones = ({ estaciones, onDelete }) => {
  const navigate = useNavigate()
  const rol = localStorage.getItem("role")
  return (
      <Row>
        <Col className="lg">
          <Table>
            <thead>
              <tr>
                <th style={headingTable}>Nombre</th>
                <th style={headingTable}>Dirección Postal</th>
                <th style={headingTable}>Bicicletas Disponibles</th>
                <th style={headingTable}>Fecha de Alta</th>
                <th style={headingTable} colSpan={numColumnas(rol)}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estaciones.map((estacion) => (
                <tr key={estacion.id} className="hoverable">
                  <td style={elementTable} className="align-middle">{estacion.nombre}</td>
                  <td style={elementTable} className="align-middle">{estacion.dirPostal}</td>
                  <td style={elementTable} className="align-middle">{estacion.bicisDisponibles}</td>
                  <td style={elementTable} className="align-middle">{estacion.fechaAlta}</td>
                  <td style={elementTable}>
                  <OpcionesRol rol = {rol} estacion = {estacion} navigate={navigate} onDelete={onDelete}/>
                    <Button  className="mx-1"
                      style={buttonStyle} onClick={() =>
                        navigate(`/estaciones/${estacion.id}`, { replace: true })
                      }
                    >
                      Ver
                    </Button>
                    
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
