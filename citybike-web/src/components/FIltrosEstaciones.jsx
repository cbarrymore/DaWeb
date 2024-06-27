import { Col, Row } from "react-bootstrap"

const FiltrosEstaciones = ({setFilterMethods}) => {
    //alignItems: 'center', en la primera
    return (
        <>
        <h1>Estaciones</h1>
        <Row style={{ padding : '2%'}}>
            <Col style={{  marginRight: '20px'}}>
                <h2>Filtrar por Nombre</h2>
                <input type="text" placeholder="Nombre de la estación" onChange={(e) => setFilterMethods[0](e.target.value)}/>
            </Col>
            <Col style={{ marginRight: '20px' }}>
                <h2>Filtrar por Código Postal</h2>
                <input type="number" placeholder="Dirección postal"  onChange={(e) => setFilterMethods[1](e.target.value)} />
            </Col>
            <Col>
                <h2>Filtrar por Número de Bicicletas</h2>
                <input type="number" placeholder="Bicis disponibles"  onChange={(e) => setFilterMethods[2](e.target.value)}/>
            </Col>
        </Row>
        </>
    )

}
export default FiltrosEstaciones