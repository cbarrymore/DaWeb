const ListaEstacion = ({ estaciones, onEdit, onDelete }) => {
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
                {estaciones.map(estacion => (
                    <tr key={estacion.id}>
                        <td>{estacion.nombre}</td>
                        <td>{estacion.dirPostal}</td>
                        <td>{estacion.bicisDisponibles}</td>
                        <td>{estacion.fechaAlta}</td>
                        <td>
                            <button onClick={() => onEdit(estacion)}>Editar</button>
                            <button onClick={() => onDelete(estacion.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListaEstacion;