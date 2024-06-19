import { useLoaderData, useNavigate } from "react-router-dom"
import Gateway from "../configs/constants"
import { useEffect, useState } from "react"
import ListaBicis from "./ListaBicis"
import Pagination from "../components/Pagination";
import { useAuth } from "../hooks/useAuth";


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


    useEffect(() => {
        const result = fetchBicis(idEstacion,currentPage,bicisPerPage)
        
    },[currentPage,bicisPerPage])

    

    const fetchBicis = async (idEstacion) => {
        const uri = Gateway + `/estaciones/${idEstacion}/bicis?page=${currentPage}&size=${bicisPerPage}`;
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
                throw new Error(`HTTP error! status: ${response.status}`);
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

    const handleDarBajaBici = async (codigoBici,motivoBaja) => {
        const uri = Gateway +  `/estaciones/${idEstacion}/bicis/${codigoBici}?motivoBaja=${motivoBaja}`;
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
            bicicletas.find(bici => bici.codigo === codigoBici).motivoBaja = motivoBaja
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


    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber !== 0 ? pageNumber - 1 : 0);
    }
    return (
    <div>
        <h1>Estacion {estacion.nombre}</h1>
        <h2>Bicicletas</h2>
        <ListaBicis bicis={bicicletas} onBaja={handleDarBajaBici} />
        <Pagination elementsPerPage={bicisPerPage} totalPages={totalPages} handlePagination={handlePagination} currentPage={currentPage} />
        <button onClick={() => navigate("/estaciones")}>Volver</button>
    </div>
    )
}
export default Estacion
