import { useLoaderData, useNavigate } from "react-router-dom"
import Gateway from "../configs/constants"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { Button, Container, Form } from "react-bootstrap";
import { crearEstacion, fetchEstacion, modificarEstacion } from "../apis/AccessEstaciones";
import { buttonNegativeStyle, buttonStyle, formStyle } from "../utils/ComponentsStyles";
import "../utils/formStyles.css"

export async function loader({ params }) {
    const estacionRet = await fetchEstacion(params.id)
    return  estacionRet 
  }

const HeaderFormulario = ({objEstacion}) => {
    if(objEstacion)
    {
      return <h1>Editar {objEstacion.nombre}</h1>
    }
    else
    {
      return <h1>Crear Estación</h1>
    }
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
        navigate(`/estaciones`)
    };
    return (
      <>
      <HeaderFormulario objEstacion={objEstacion}/>
      <Container fluid className="d-flex justify-content-center align-items-center my-5">
      <Form onSubmit={handleSubmit} className="p-5 formulario">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control  className="align-middle" required name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Nombre de estación" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Numero Puestos</Form.Label>
        <Form.Control name="numPuestos" type="number" step={1}
        placeholder="Numero Puestos" value={form.numPuestos} onChange={handleChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Código Postal</Form.Label>
        <Form.Control name="dirPostal" type="number" 
        placeholder="Código postal" value={form.dirPostal} onChange={handleChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Latitud</Form.Label>
        <Form.Control name="latitud" type="number" step={0.0001}
        placeholder="Latitud" value={form.latitud} onChange={handleChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Longitud</Form.Label>
        <Form.Control name="longitud" type="number" step={0.0001}
        placeholder="Longitud" value={form.longitud} onChange={handleChange} required/>
      </Form.Group>
      <Button className="mx-1" style={buttonStyle} variant="primary" type="submit">
        Confirmar
      </Button>
      <Button className="mx-1" style={buttonNegativeStyle} variant="secondary" onClick={() => navigate("/estaciones")}>
          Atrás
        </Button>
    </Form>
    </Container>
    </>
    );
};

export default FormularioEstacion;
/*<FormularioEstacion
onSubmit={selectedStation ? handleUpdate : handleCreate}
initialData={selectedStation}
key={selectedStation ? selectedStation.id : undefined}
/>*/