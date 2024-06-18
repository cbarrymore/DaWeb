import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import ListaEstacion from "../components/ListaEstacion";
import FormularioEstacion from "../components/FormularioEstacion";
import Gateway from "../configs/constants";
import Pagination from "../components/Pagination";
export const Estaciones = () => {
    const  {token} = useAuth();
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [stationsPerPage, setStationsPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedStation, setSelectedStation] = useState(null);

    useEffect(() => {
        fetchStations();
    }, [currentPage,stationsPerPage]);

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
        return;
        const response = await axios.put(`/api/stations/${updatedStation.id}`, updatedStation);
        setStations(stations.map(station => station.id === updatedStation.id ? response.data : station));
    };

    const handleDelete = async (id) => {
        return;
        await axios.delete(`/api/stations/${id}`);
        setStations(stations.filter(station => station.id !== id));
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber !== 0 ? pageNumber - 1 : 0);
    }

    return (
        <div>
            <h1>Estaciones</h1>
            <ListaEstacion estaciones={stations} onEdit={setSelectedStation} onDelete={handleDelete} />
            <Pagination stationsPerPage={stationsPerPage} totalPages={totalPages} handlePagination={handlePagination} currentPage={currentPage} />
            <FormularioEstacion
                onSubmit={selectedStation ? handleUpdate : handleCreate}
                initialData={selectedStation}
                key={selectedStation ? selectedStation.id : undefined}
            />
        </div>
    );

}