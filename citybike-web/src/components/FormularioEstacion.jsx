import { useLoaderData, useNavigate } from "react-router-dom"
import Gateway from "../configs/constants"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { Button, Form } from "react-bootstrap";

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
    const navigate = useNavigate()
    const [form, setForm] = useState({
        nombre: '',
        numPuestos: '',
        dirPostal: '',
        latitud: '',
        longitud: ''
    });

    useEffect(() => {
      alert(JSON.stringify(objEstacion))
        if (objEstacion) {
            let estacion = {
                nombre : objEstacion.nombre,
                numPuestos : objEstacion.numPuestos,
                dirPostal : objEstacion.dirPostal,
                latitud : objEstacion.latitud,
                longitud : objEstacion.longitud
            };
            setForm(estacion);
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
        if(objEstacion)
        {
          modificarEstacion(form, objEstacion.id)
        }
        else
        {
          crearEstacion(form)
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
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control required name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Nombre de estación" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Numero Puestos</Form.Label>
        <Form.Control name="numPuestos" type="number" step={1}
        placeholder="Numero Puestos" value={form.numPuestos} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Código Postal</Form.Label>
        <Form.Control name="dirPostal" type="number" 
        placeholder="Código postal" value={form.dirPostal} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Latitud</Form.Label>
        <Form.Control name="latitud" type="number" step={0.0001}
        placeholder="Latitud" value={form.latitud} onChange={handleChange} />
        <Form.Label>Longitud</Form.Label>
        <Form.Control name="longitud" type="number" step={0.0001}
        placeholder="Longitud" value={form.longitud} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="secondary" onClick={() => navigate("/estaciones")}>
          Atrás
        </Button>
    </Form>
    );
};

export default FormularioEstacion;
/*<FormularioEstacion
onSubmit={selectedStation ? handleUpdate : handleCreate}
initialData={selectedStation}
key={selectedStation ? selectedStation.id : undefined}
/>*/