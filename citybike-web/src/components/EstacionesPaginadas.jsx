import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import Gateway from "../configs/constants";
import Pagination from "./Pagination";
import TablaEstaciones from "./TablaEstaciones";
import FiltrosEstaciones from "./FIltrosEstaciones";
import { fetchEstaciones, deleteEstacion } from "../apis/AccessEstaciones";
import Swal from "sweetalert2"
import EstacionModel from "../Models/EstacionModel";
import { Col, Container, Row } from "react-bootstrap";
import { appCard, headingTable } from "../utils/ComponentsStyles";

export const EstacionesPaginada = ({filters}) => {
    const  {token} = useAuth();
    const [stations, setStations] = useState([]);
    // const [filteredStations, setFilteredStations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [stationsPerPage, setStationsPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedStation, setSelectedStation] = useState(null);
    const [filtroNumBicicletas, setFiltroNumBicicletas] = useState(null);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroCodigoPostal, setFiltroCodigoPostal] = useState('');
    
    useEffect(() => {
        getEstaciones();
    }, [currentPage,stationsPerPage]);
    
    // useEffect(() => {
    //     handleFiltros();
    //     console.log(filteredStations);
    // }, [filtroNombre,filtroCodigoPostal,filtroNumBicicletas,stations,currentPage,stationsPerPage]);
    const filteredStations = useMemo(() => {
        let result = [...stations]
        if (filtroNombre) {
            result = result.filter(e => e.nombre.includes(filtroNombre));
        }
        if (filtroCodigoPostal) {
            result = result.filter(e => e.dirPostal.toString().startsWith(filtroCodigoPostal));
        }
        if (filtroNumBicicletas) {
            console.log(filtroNumBicicletas);
            result = result.filter(e => e.bicisDisponibles == filtroNumBicicletas);
        }
        return result;
    } , [stations,filtroNombre,filtroCodigoPostal,filtroNumBicicletas,currentPage,stationsPerPage]);
    const handleFiltros = () => {

        let result = [...stations]
        if (filtroNombre) {
            result = result.filter(e => e.nombre.includes(filtroNombre));
        }
        if (filtroCodigoPostal) {
            console.log(filtroCodigoPostal);
            console.log(result);
            result = result.filter(e => e.dirPostal.toString().startsWith(filtroCodigoPostal));
        }
        if (filtroNumBicicletas) {
            result = result.filter(e => e.bicisDisponibles == filtroNumBicicletas);
        }
        // setFilteredStations(result);
    };

    const handleFiltroNombre = () => {
        const filteredStations = stations.lenght === 0 ? 
                                    stations.filter(e=> e.nombre.includes(filtroNombre))
                                    : filteredStations.filter(fe => fe.nombre.includes(filtroNombre));
        console.log(filteredStations.length);
        setFilteredStations(filteredStations);
    };
    const handleFiltroCodigoPostal = () => {
        const filteredStations = stations.lenght === 0 ? 
                                    stations.filter(e => e.dirPostal.toString().startsWith( filtroCodigoPostal))
                                    : filteredStations.filter(fe => fe.dirPostal.toString().startsWith( filtroCodigoPostal));
        setFilteredStations(filteredStations);
    };
    const handleFiltroNumBicicletas = () => {
        const filteredStations = stations.lenght === 0 ?
                                    stations.filter(e => e.numBicicletas === filtroNumBicicletas)
                                    : filteredStations.filter(fe => fe.numBicicletas === filtroNumBicicletas);
        setFilteredStations(filteredStations);
    };
    const getEstaciones =  () => {
        fetchEstaciones(currentPage, stationsPerPage).then((data) => {
            const estaciones = data._embedded.estacionDtoList
            if (!estaciones) {
                return
            }
            const estacionesModel = estaciones.map(estacion => {
                return new EstacionModel(
                    estacion.id,
                    estacion.nombre,
                    estacion.dirPostal,
                    estacion.bicisDisponibles,
                    estacion.fechaAlta
                )
            })
            
            setStations(estacionesModel);
            setTotalPages(data.page.totalPages);
        }).catch((err) => Swal.fire({
            title: "Error",
            text: "No se ha podido obtener la lista de estaciones\n" + err.message,
            icon: "error",
            confirmButtonText: "Ok"
        }))
        
    };

    const handleCreate = async (station) => {
        return;
        const response = await axios.post('/api/stations', station);
        setStations([...stations, response.data]);
    };

    const handleUpdate = async (updatedStation) => {
        try{

        }catch(err){
            if (err.name === "AbortError") {
                alert(
                    "Fetch aborted by user action (browser stop button, closing tab, etc.",
                );
            } else if (err.name === "TypeError") {
                alert("AbortSignal.timeout() method is not supported");
            } else {
                // A network error, or some other problem.
                alert(`Error: type: ${err.name}, message: ${err.message}`);
            }
        }
        return;
        const response = await axios.put(`/api/stations/${updatedStation.id}`, updatedStation);
        setStations(stations.map(station => station.id === updatedStation.id ? response.data : station));
    };

    const handleDelete = (id) => {
        deleteEstacion(id)
        setStations(stations.filter(station => station.id !== id));
        handleFiltros();
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber !== 0 ? pageNumber - 1 : 0);
    }

    return (
        <><h1 className="my-3">Estaciones</h1>
        <Container fluid className=" p-5" style={appCard}>
            {filters ? 
                <FiltrosEstaciones setFilterMethods={[setFiltroNombre,setFiltroCodigoPostal,setFiltroNumBicicletas]} />
                : null
            }
            <TablaEstaciones estaciones={filteredStations} onDelete={handleDelete} />
            <Row>
            <Col>
            <Pagination elementsPerPage={stationsPerPage} totalPages={totalPages} handlePagination={handlePagination} currentPage={currentPage} />
            </Col>
            </Row>
        </Container>
        </>
    );

}