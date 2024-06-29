import { useLoaderData, useNavigate } from "react-router-dom"
import Gateway from "../configs/constants"
import { useContext, useEffect, useState } from "react"
import ListaBicis from "./ListaBicis"
import Pagination from "../components/Pagination";
import { useAuth } from "../hooks/useAuth";
import UserContext from "../contexts/UserContext";
import { alquilarBicicleta, crearReserva, dejarBicicleta } from "../apis/AccessAlquileres";
import Swal from "sweetalert2";
import { Button, Container } from "react-bootstrap";
import { fetchBicicletas, fetchEstacion } from "../apis/AccessEstaciones";
import BiciModel from "../Models/BiciModel";
import {buttonStyle} from "../utils/ComponentsStyles";

import LoadingModal from "./LoadingModal";

export async function loader({ params }) {
  const estacion = await fetchEstacion(params.id).catch((err) => {
    Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
        });
    }
    )
  return { estacion }
}




const Estacion = () => {
    const [bicicletas, setBicicletas] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [bicisPerPage, setBicisPerPage] = useState(4)
    const [totalPages, setTotalPages] = useState(0)
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const { estacion} = useLoaderData()
    const idEstacion = estacion.id
    const navigate = useNavigate()
    const {setReservas,alquiler,setAlquiler,updateUserContext} = useContext(UserContext)

    useEffect(() => {
        console.log("Actualizamos la lista de bicicletas")
        fetchBicis(idEstacion,currentPage,bicisPerPage)
        updateUserContext()
    },[currentPage,bicisPerPage,update])

    

    const fetchBicis = async (idEstacion) => {
        setLoading(true)
        fetchBicicletas(idEstacion,currentPage,bicisPerPage).then((data) => {
            const bicis = data._embedded?.biciDtoList
            if (!bicis) {
                return
            }
            const bicisModel = bicis.map(bici => {
                return new BiciModel(
                    bici.codigo,
                    bici.modelo,
                    bici.fechaAlta,
                    bici.fechaBaja,
                    bici.motivoBaja,
                    bici.disponible
                )
            })
            setBicicletas(bicisModel)
            setTotalPages(data.page.totalPages)
        }).catch((err) => Swal.fire({
            title: "Error",
            text: "No se ha podido obtener la lista de bicicletas\n" + err.message,
            icon: "error",
            confirmButtonText: "Ok"
        })).finally(() => setLoading(false))
    }


    const handleReservarBici = async (codigoBici) => {
        console.log(codigoBici)
        setLoading(true)
        crearReserva(codigoBici).then(() => fetchBicis(idEstacion))
        .then(() =>{ 
            updateUserContext()
            Swal.fire({
            title: "Reserva realizada",
            text: "Se ha reservado la bicicleta",
            icon: "success",
            confirmButtonText: "Ok"
            })
            console.log(bicicletas)
            let bicisFiltradas = bicicletas.filter(bici => bici.codigo !== codigoBici)
            console.log(bicisFiltradas)
            setBicicletas(bicisFiltradas);
            setUpdate(!update)
        }
        ).catch((err) => Swal.fire({
            title: "Error",
            text: "No se ha podido reservar la bicicleta\n" + err.message,
            icon: "error",
            confirmButtonText: "Ok"
        })).finally(() => setLoading(false))

    }

    const handleAlquilarBici = async (codigoBici) => {
        setLoading(true)
        alquilarBicicleta(codigoBici).then(() => {
            Swal.fire({
                title: "Bicicleta alquilada",
                text: "Se ha alquilado la bicicleta",
                icon: "success",
                confirmButtonText: "Ok"
            })
            setUpdate(!update)
            setReservas([])
        }).catch((err) => (
            Swal.fire({
            title: "Error",
            text: "No se ha podido alquilar la bicicleta\n" + err.message,
            icon: "error",
            confirmButtonText: "Ok"
            })
        ).finally(() => setLoading(false))
        )
    }

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber !== 0 ? pageNumber - 1 : 0);
    }

    const handleDejarBici = async () => {
        console.log(alquiler)
        setLoading(true)
        if(alquiler !== null){
            dejarBicicleta(idEstacion).then(() => {
                Swal.fire({
                    title: "Bicicleta devuelta",
                    text: "Se ha devuelto la bicicleta",
                    icon: "success",
                    confirmButtonText: "Ok"
                })
                setAlquiler(null)
                setUpdate(!update)
            }).catch((err) => Swal.fire({
                title: "Error",
                text: "No se ha podido devolver la bicicleta" + err.message,
                icon: "error",
                confirmButtonText: "Ok"
            })).finally(() => setLoading(false))
        }
    }

    return (
    <Container>
        <h1>Estacion {estacion.nombre}</h1>
        <h2>Bicicletas</h2>
        {alquiler !== null && (
            <>
                <p>Ya tiene una bicicleta alquilada</p>
                <Button onClick={() => handleDejarBici()}>Dejar bici</Button> 
            </>
        )}
        
        <ListaBicis bicis={bicicletas} onAlquiler={handleAlquilarBici} onReserva={handleReservarBici} idEstacion={idEstacion} />
        <Pagination elementsPerPage={bicisPerPage} totalPages={totalPages} handlePagination={handlePagination} currentPage={currentPage} />
        <Button style={buttonStyle} onClick={() => navigate("/estaciones")}>Volver</Button>
        <LoadingModal show={loading} />
    </Container>
    )
}
export default Estacion
