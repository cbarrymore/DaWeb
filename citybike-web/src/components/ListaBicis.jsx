import FormDialog from './FormDialog';
import { userRoles as ur } from "../data/userRoles";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import NuevaBiciDialog from './NuevaBiciDialog';
import { useContext} from 'react';
import UserContext from '../contexts/UserContext';
import { elementTable} from "../utils/ComponentsStyles"

const OpcionesRol = ({ rol, onReserva, onAlquiler, biciCodigo, idEstacion}) => {
    const {alquiler, reservas} = useContext(UserContext);

  if(rol === ur.gestor)
    {
      return (
        <td>
        <FormDialog idBici={biciCodigo} idEstacion={idEstacion}/>
        </td>
      )
    }
  if(rol === ur.usuario)
    {
      console.log(alquiler)
      console.log(reservas)
      return (
        <td>
          <Button className='mx-1 boton' disabled={reservas.length >0  || alquiler !== null} onClick={() => onReserva(biciCodigo)}>
            {"Reservar"}
          </Button>
          <Button className='mx-1 boton' disabled={reservas.length >0  || alquiler !== null} onClick={ () => onAlquiler(biciCodigo)}>
            {"Alquilar"}
          </Button>
        </td>
      );
    }
}

const CrearBici = ({rol,idEstacion}) =>
  {
    if(rol === ur.gestor)
      {
        return (
          <NuevaBiciDialog idEstacion={idEstacion} />
        )

      }
  }

const ListaBicis = ({ bicis,onReserva,onAlquiler, idEstacion }) => {
  console.log(idEstacion)
  const {alquiler, reservas} = useContext(UserContext);

  return (
    <Container>
      <Row>
        <Col>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th style={elementTable}>Codigo</th>
                <th style={elementTable}>Modelo</th>
                <th style={elementTable}>Fecha de Alta</th>
                <th style={elementTable}>Fecha de Baja</th>
                <th style={elementTable}>Motivo de Baja</th>
                <th style={elementTable}>Disponible</th>
                <th style={elementTable}></th>
              </tr>
            </thead>
            <tbody>
              {bicis.map((bici) => (
                  <tr key={bici.codigo}>
                  <td className="align-middle">{bici.codigo}</td>
                  <td className="align-middle">{bici.modelo}</td>
                  <td className="align-middle">{bici.fechaAlta}</td>
                  {bici.fechaBaja ? <td className="align-middle">{bici.fechaBaja}</td> : <td className="align-middle"> - </td>}
                  {bici.motivoBaja ? <td className="align-middle">{bici.motivoBaja}</td> : <td className="align-middle"> - </td>}
                  <td className="align-middle">{bici.disponible ? "Sí" : "No"}</td>
                    <OpcionesRol rol={localStorage.getItem("role")} onReserva={onReserva} onAlquiler={onAlquiler} biciCodigo={bici.codigo} idEstacion={idEstacion}/>
                    {/* <button onClick={() => onBaja(bici.codigo)}>Dar de baja</button> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md="auto">
        <CrearBici rol={localStorage.getItem("role")} idEstacion={idEstacion}/>
        </Col>
      </Row>
    </Container>
  )
}

export default ListaBicis
