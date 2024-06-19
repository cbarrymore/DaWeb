import FormDialog from './FormDialog';

const DarBajaFormDialog = ({ onBaja, biciCodigo}) => {
    const handleSubmit = (formJson) => {
        const motivoBaja  = formJson.motivoBaja;
        console.log(motivoBaja);
        onBaja(biciCodigo, motivoBaja);
    }
  return (
    <FormDialog onSubmit={handleSubmit} buttonText="Dar de baja" dialogTitle="Dar de baja" dialogContentText="Ingrese el motivo de la baja" submitText="Dar de baja"
      formFields={[  {id: "motivoBaja", name: "motivoBaja", label: "Motivo de baja", type: "text"}]} />
  )
}

const ListaBicis = ({ bicis, onBaja, onDelete }) => {
  return (
    <table>
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
            <td>
                <DarBajaFormDialog onBaja={onBaja} biciCodigo={bici.codigo}/>
              {/* <button onClick={() => onBaja(bici.codigo)}>Dar de baja</button> */}
              <button onClick={() => onDelete(bici.codigo)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListaBicis
