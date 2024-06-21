import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import ListaEstacion from "../components/ListaEstacion";
import Gateway from "../configs/constants";
import Pagination from "../components/Pagination";
export const Estaciones = () => {
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
        fetchStations();
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
    const fetchStations = async () => {
        
        const uri = Gateway + `/estaciones?page=${currentPage}&size=${stationsPerPage}`;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        console.log(uri);
        try{
            const response = await fetch(uri, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setStations(data._embedded.estacionDtoList);
            setTotalPages(data.page.totalPages);
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

    const handleDelete = async (id) => {
        const uri = Gateway + `/estaciones/${id}`;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };
        console.log(uri);
        try{
            const response = await fetch(uri, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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
        setStations(stations.filter(station => station.id !== id));
        handleFiltros();
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber !== 0 ? pageNumber - 1 : 0);
    }

    return (
        <div>
            <h1>Estaciones</h1>
            <div style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginBottom: '30px'}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px'}}>
                    <h2>Filtrar por Nombre</h2>
                    <input type="text" placeholder="Nombre de la estación" value={filtroNombre} onChange={(e) => setFiltroNombre(e.target.value)}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
                    <h2>Filtrar por Código Postal</h2>
                    <input type="number" placeholder="Dirección postal" value={filtroCodigoPostal} onChange={(e) => setFiltroCodigoPostal(e.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>Filtrar por Número de Bicicletas</h2>
                    <input type="number" placeholder="Bicis disponibles" value={filtroNumBicicletas} onChange={(e) => setFiltroNumBicicletas(e.target.value)}/>
                </div>
            </div>
            
            <ListaEstacion estaciones={filteredStations} onDelete={handleDelete} />
            <Pagination elementsPerPage={stationsPerPage} totalPages={totalPages} handlePagination={handlePagination} currentPage={currentPage} />
        </div>
    );

}