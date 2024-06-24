
const FiltrosEstaciones = ({setFilterMethods}) => {

    return (
        <>
        <h1>Estaciones</h1>
        <div style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginBottom: '30px'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px'}}>
                <h2>Filtrar por Nombre</h2>
                <input type="text" placeholder="Nombre de la estación" onChange={(e) => setFilterMethods[0](e.target.value)}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
                <h2>Filtrar por Código Postal</h2>
                <input type="number" placeholder="Dirección postal"  onChange={(e) => setFilterMethods[1](e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Filtrar por Número de Bicicletas</h2>
                <input type="number" placeholder="Bicis disponibles"  onChange={(e) => setFilterMethods[2](e.target.value)}/>
            </div>
        </div>
        </>
    )

}
export default FiltrosEstaciones