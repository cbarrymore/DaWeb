import FormDialog from './FormDialog';
import { userRoles as ur } from "../data/userRoles";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import NuevaBiciDialog from './NuevaBiciDialog';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const OpcionesRol = ({ rol, onBaja, onReserva, onAlquiler, biciCodigo}) => {
    const {alquiler, reservas} = useContext(UserContext);

    const handleSubmit = (formJson) => {
        const motivoBaja  = formJson.motivoBaja;
        console.log(motivoBaja);
        onBaja(biciCodigo, motivoBaja);
    }
  if(rol === ur.gestor)
    {
      return (
        <td>
        <FormDialog onSubmit={handleSubmit} buttonText="Dar de baja" dialogTitle="Dar de baja" dialogContentText="Ingrese el motivo de la baja" submitText="Dar de baja"
          formFields={[  {id: "motivoBaja", name: "motivoBaja", label: "Motivo de baja", type: "text", valor: ""}]} />
          </td>
      )
    }
  if(rol === ur.usuario)
    {
      console.log(alquiler)
      console.log(reservas)
      return (
        <td>
          <Button disabled={reservas.length >0  || alquiler !== null} onClick={() => onReserva(biciCodigo)}>
            {"Reservar"}
          </Button>
          <Button disabled={alquiler !== null} onClick={ () => onAlquiler(biciCodigo)}>
            {"Alquilar"}
          </Button>
        </td>
      );
    }
}

const CrearBici = ({rol, navigate}) =>
  {
    if(rol === ur.gestor)
      {
        return (
          <Button onClick={() =>
                  navigate(`/estaciones/editar`, { replace: true })}>+</Button>)
      }
  }

const ListaBicis = ({ bicis, onBaja,onReserva,onAlquiler, idEstacion }) => {
  console.log(idEstacion)
  const {alquiler, reservas} = useContext(UserContext);

  return (
    <Container>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Modelo</th>
                <th>Fecha de Alta</th>
                <th>Fecha de Baja</th>
                <th>Motivo de Baja</th>
                <th>Disponible</th>
              </tr>
            </thead>
            <tbody>
              {bicis.map((bici) => (
                  <tr key={bici.codigo}>
                  <td>{bici.codigo}</td>
                  <td>{bici.modelo}</td>
                  <td>{bici.fechaAlta}</td>
                  {bici.fechaBaja ? <td>{bici.fechaBaja}</td> : <td> - </td>}
                  {bici.motivoBaja ? <td>{bici.motivoBaja}</td> : <td> - </td>}
                  <td>{bici.disponible ? "Sí" : "No"}</td>
                    <OpcionesRol rol={localStorage.getItem("role")} onBaja={onBaja} onReserva={onReserva} onAlquiler={onAlquiler} biciCodigo={bici.codigo}/>
                    {/* <button onClick={() => onBaja(bici.codigo)}>Dar de baja</button> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md="auto">
              <NuevaBiciDialog idEstacion={idEstacion} />
        </Col>
      </Row>
    </Container>
  )
}

export default ListaBicis
