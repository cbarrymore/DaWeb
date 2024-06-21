import { useLoaderData } from "react-router-dom"
import Gateway from "../configs/constants"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth";

export async function loader({ params }) {
    const estacionRet = await fetchEstacion(params.id)
    return  estacionRet 
  }

  const crearEstacion = async (estacion) => {
    const token = localStorage.getItem("token")
    const uri = Gateway + `/estaciones`
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    myHeaders.append('Content-Type', 'application/json')
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body : JSON.stringify(estacion),
      redirect: "follow",
    
    }
    try {
      const response = await fetch(uri, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
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

  const modificarEstacion = async (estacion, id) => {
    const token = localStorage.getItem("token")
    const uri = Gateway + `/estaciones/${id}`
    estacion.id = id;
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    myHeaders.append('Content-Type', 'application/json')
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body : JSON.stringify(estacion),
      redirect: "follow",
    }
    try {
      const response = await fetch(uri, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
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

const FormularioEstacion = () => {
    const objEstacion = useLoaderData();
    let crear;
    const [form, setForm] = useState({
        nombre: '',
        numPuestos: '',
        dirPostal: '',
        latitud: '',
        longitud: ''
    });

    useEffect(() => {
        if (objEstacion) {
            let estacion = {
                nombre : objEstacion.nombre,
                dirPostal : objEstacion.dirPostal,
                latitud : objEstacion.latitud,
                longitud : objEstacion.longitud
            };
            setForm(estacion);
            crear = false;
        }
        else
        {
            crear = true;
        }
    }, [objEstacion]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(crear)
        {
            crearEstacion(form)
        }
        else
        {
            modificarEstacion(form, objEstacion.id)
        }
        setForm({
            nombre: '',
            numPuestos: '',
            dirPostal: '',
            latitud: '',
            longitud: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
            />
            <input
                type="number"
                name="dirPostal"
                placeholder="Código Postal"
                value={form.dirPostal}
                onChange={handleChange}
            />
            <input
                type="number"
                step="0.0001"
                name="latitud"
                placeholder="Latitud"
                value={form.latitud}
                onChange={handleChange}
            />
            <input
                type="number"
                step="0.0001"
                name="longitud"
                placeholder="Longitud"
                value={form.longitud}
                onChange={handleChange}
            />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default FormularioEstacion;
/*<FormularioEstacion
onSubmit={selectedStation ? handleUpdate : handleCreate}
initialData={selectedStation}
key={selectedStation ? selectedStation.id : undefined}
/>*/