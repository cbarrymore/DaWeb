import { Link, useNavigate } from "react-router-dom"
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { userRoles as ur } from "../data/userRoles"
import FormularioEstacion from "./FormularioEstacion";
import { elementTable } from "../utils/ComponentsStyles";

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
          <Button className="mx-1 boton" onClick={() =>
                  navigate(`/estaciones/editar/${estacion.id}`, { replace: true })}>Editar</Button>
          <Button className="mx-1 boton" onClick={() => onDelete(estacion.id)}>Eliminar</Button>
          </>)
      }
  }

  const CrearEstacion = ({rol, navigate}) =>
    {
      if(rol === ur.gestor)
        {
          return (
            <Button className="boton" onClick={() =>
              navigate(`/estaciones/editar`, { replace: true })}>+</Button>)
  
        }
    }

const TablaEstaciones = ({ estaciones, onDelete }) => {
  const navigate = useNavigate()
  const rol = localStorage.getItem("role")
  return (
      <Row>
        <Col className="lg">
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th style={elementTable}>Nombre</th>
                <th style={elementTable}>Dirección Postal</th>
                <th style={elementTable}>Bicicletas Disponibles</th>
                <th style={elementTable}>Fecha de Alta</th>
                <th style={elementTable}>Número de puestos</th>
                <th style={elementTable} colSpan={numColumnas(rol)}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estaciones.map((estacion) => (
                <tr key={estacion.id} className="hoverable">
                  <td  className="align-middle">{estacion.nombre}</td>
                  <td  className="align-middle">{estacion.dirPostal}</td>
                  <td  className="align-middle">{estacion.bicisDisponibles}</td>
                  <td  className="align-middle">{estacion.fechaAlta}</td>
                  <td className="align-middle">{estacion.numPuestos}</td>
                  <td >
                  <OpcionesRol rol = {rol} estacion = {estacion} navigate={navigate} onDelete={onDelete}/>
                    <Button  className="mx-1 boton" onClick={() =>
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

export default TablaEstaciones
