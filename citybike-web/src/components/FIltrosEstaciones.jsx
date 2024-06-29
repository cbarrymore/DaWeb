import { Col, Container, Row } from "react-bootstrap"
import { filterHead } from "../utils/ComponentsStyles"

const FiltrosEstaciones = ({setFilterMethods}) => {
    //alignItems: 'center', en la primera
    return (
        <Container className="mb-5">
        <Row style={filterHead}>
        <Row  className="mt-5 align-center">
            <Col  style={{  marginRight: '20px'}}>
                <h2>Filtrar por Nombre</h2>
            </Col>
            <Col style={{ marginRight: '20px' }}>
                <h2>Filtrar por Código Postal</h2>
            </Col>
            <Col>
                <h2>Filtrar por Número de Bicicletas</h2>
            </Col>
        </Row>
        <Row  className=" mb-3 p-3 align-center">
            <Col style={{  marginRight: '20px'}}>
                <input type="text" placeholder="Nombre de la estación" onChange={(e) => setFilterMethods[0](e.target.value)}/>
            </Col>
            <Col style={{ marginRight: '20px' }}>
                <input type="number" placeholder="Dirección postal"  onChange={(e) => setFilterMethods[1](e.target.value)} />
            </Col>
            <Col>
                <input type="number" placeholder="Bicis disponibles"  onChange={(e) => setFilterMethods[2](e.target.value)}/>
            </Col>
        </Row>
        </Row>
        </Container>
    )

}
export default FiltrosEstaciones