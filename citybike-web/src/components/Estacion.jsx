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


export async function loader({ params }) {
  const estacion = await fetchEstacion(params.id)
  return { estacion }
}

const fetchEstacion = async (id) => {
  const token = localStorage.getItem("token")
  const uri = Gateway + `/estaciones/${id}`
  const myHeaders = new Headers()
  myHeaders.append("Authorization", "Bearer " + token)
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  try {
    const response = await fetch(uri, requestOptions)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const estacion = await response.json()
    return estacion
  } catch (err) {
    if (err.name === "AbortError") {
      alert(
        "Fetch aborted by user action (browser stop button, closing tab, etc."
      )
    } else if (err.name === "TypeError") {
      alert("AbortSignal.timeout() method is not supported")
    } else {
      // A network error, or some other problem.
      alert(`Error: type: ${err.name}, message: ${err.message}`)
    }
  }
  return {}
}



const Estacion = () => {
    const  {token} = useAuth();
    const { estacion} = useLoaderData()
    const idEstacion = estacion.id
    const [bicicletas, setBicicletas] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [bicisPerPage, setBicisPerPage] = useState(4)
    const [totalPages, setTotalPages] = useState(0)
    const navigate = useNavigate()
    const {reservas,setReservas,alquiler,setAlquiler,updateUserContext} = useContext(UserContext)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        console.log("Actualizamos la lista de bicicletas")
        const result = fetchBicis(idEstacion,currentPage,bicisPerPage)
        updateUserContext()
        
    },[currentPage,bicisPerPage,update])

    

    const fetchBicis = async (idEstacion, motivoBaja) => {
        let uri = Gateway + `/estaciones/${idEstacion}/bicis`;
        if(localStorage.getItem("role") === "usuario")
        {
            uri += `/disponibles`
        }
        uri += `?page=${currentPage}&size=${bicisPerPage}`
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        try{
            const response = await fetch(uri, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} ${uri}`);
            }
            const data = await response.json();
            console.log(data);
            const bicis = data._embedded?.biciDtoList
            if (bicis){
                setBicicletas(bicis)
                setTotalPages(data.page.totalPages)
            }
            return data;
        } catch(err){
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
            
    }

    const handleDarBajaBici = async (codigoBici,motivo) => {
        const uri = Gateway +  `/estaciones/${idEstacion}/bicis/${codigoBici}?motivoBaja=${motivo}`;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };
        try{
            const response = await fetch(uri, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchBicis(idEstacion)
        } catch(err){
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
    }

    const handleReservarBici = async (codigoBici) => {
        console.log(codigoBici)
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
        }))

    }

    const handleAlquilarBici = async (codigoBici) => {
        alquilarBicicleta(codigoBici).then(() => {
            Swal.fire({
                title: "Bicicleta alquilada",
                text: "Se ha alquilado la bicicleta",
                icon: "success",
                confirmButtonText: "Ok"
            })
            setUpdate(!update)
        }).catch((err) => Swal.fire({
            title: "Error",
            text: "No se ha podido alquilar la bicicleta\n" + err.message,
            icon: "error",
            confirmButtonText: "Ok"
        })
        )
    }

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber !== 0 ? pageNumber - 1 : 0);
    }

    const handleDejarBici = async () => {
        console.log(alquiler)
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
            }))
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
        
        <ListaBicis bicis={bicicletas} onBaja={handleDarBajaBici} onAlquiler={handleAlquilarBici} onReserva={handleReservarBici} idEstacion={idEstacion} />
        <Pagination elementsPerPage={bicisPerPage} totalPages={totalPages} handlePagination={handlePagination} currentPage={currentPage} />
        <Button onClick={() => navigate("/estaciones")}>Volver</Button>
        
    </Container>
    )
}
export default Estacion
