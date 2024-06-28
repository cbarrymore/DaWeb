import FormDialog from './FormDialog';
import { userRoles as ur } from "../data/userRoles";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import NuevaBiciDialog from './NuevaBiciDialog';
import { useContext} from 'react';
import UserContext from '../contexts/UserContext';
import {buttonStyle, elementTable, headingTable} from "../utils/ComponentsStyles"

const OpcionesRol = ({ rol, onReserva, onAlquiler, biciCodigo, idEstacion}) => {
    const {alquiler, reservas} = useContext(UserContext);

  if(rol === ur.gestor)
    {
      return (
        <td style={elementTable}>
        <FormDialog idBici={biciCodigo} idEstacion={idEstacion}/>
        </td>
      )
    }
  if(rol === ur.usuario)
    {
      console.log(alquiler)
      console.log(reservas)
      return (
        <td style={elementTable}>
          <Button className='mx-1' disabled={reservas.length >0  || alquiler !== null} style={buttonStyle} onClick={() => onReserva(biciCodigo)}>
            {"Reservar"}
          </Button>
          <Button className='mx-1' disabled={reservas.length >0  || alquiler !== null} style={buttonStyle} onClick={ () => onAlquiler(biciCodigo)}>
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
          <Table>
            <thead>
              <tr>
                <th style={headingTable}>Codigo</th>
                <th style={headingTable}>Modelo</th>
                <th style={headingTable}>Fecha de Alta</th>
                <th style={headingTable}>Fecha de Baja</th>
                <th style={headingTable}>Motivo de Baja</th>
                <th style={headingTable}>Disponible</th>
                <th style={headingTable}></th>
              </tr>
            </thead>
            <tbody>
              {bicis.map((bici) => (
                  <tr key={bici.codigo}>
                  <td style={elementTable} className="align-middle">{bici.codigo}</td>
                  <td style={elementTable} className="align-middle">{bici.modelo}</td>
                  <td style={elementTable} className="align-middle">{bici.fechaAlta}</td>
                  {bici.fechaBaja ? <td style={elementTable} className="align-middle">{bici.fechaBaja}</td> : <td style={elementTable} className="align-middle"> - </td>}
                  {bici.motivoBaja ? <td style={elementTable} className="align-middle">{bici.motivoBaja}</td> : <td style={elementTable} className="align-middle"> - </td>}
                  <td style={elementTable} className="align-middle">{bici.disponible ? "Sí" : "No"}</td>
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
