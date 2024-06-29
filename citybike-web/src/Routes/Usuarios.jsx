import { useContext, useMemo, useState } from "react";
import Gateway from "../configs/constants"
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { appCard, filterHead } from "../utils/ComponentsStyles";
import { useAuth } from "../hooks/useAuth";
import LoadingModal from "../components/LoadingModal";


const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtroBusqueda, setFiltroBusqueda] = useState('');
    const  {token} = useAuth();
    const filteredUsuarios = useMemo(() => {
        let result = [...usuarios]
        if (filtroBusqueda) {
            result = result.filter(e => e.Username.includes(filtroBusqueda));
        }
        return result;
    } , [usuarios,filtroBusqueda]);
    //<TablaUsuarios usuarios={filteredStations} onDelete={handleDelete} />
    return(
    <><h1 className="my-3">Usuarios</h1>
        <Container fluid className=" p-5" style={appCard}>
            <Container className="mb-5">
                <Row style={filterHead}>
                <Row  className="mt-5 align-center">
                    <Col>
                    <h2>Buscar Usuario</h2>
                    </Col>
                </Row>
                <Row  className=" my-3 p-3 align-center">
                <Col >
                    <input type="text" placeholder="Nombre de la estación" onChange={(e) => setFiltroBusqueda(e.target.value)}/>
                </Col>
                </Row>
                </Row>
            </Container>
            <LoadingModal loading={loading} />
        </Container>
    </>);
}
export default Usuarios;