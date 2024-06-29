import { useContext, useState } from "react";
import Gateway from "../configs/constants"
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Form, Row } from "react-bootstrap";
import "./Registrarse.css"
import { appCard } from "../utils/ComponentsStyles";
import { registrarUsuario } from "../apis/AccessUsuario";
import LoadingModal from "../components/LoadingModal"
import Swal from "sweetalert2";

export const Registrarse = () =>{
  const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        Id: '',
        Username: '',
        Nombre: '',
        Codigo: '',
        Acceso: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        registrarUsuario(form).then(() => {
          setForm({
            Id: '',
            Username: '',
            Nombre: '',
            Codigo: '',
            Acceso: ''
        });
        Swal.fire({
          title: 'Registrado!',
          text: 'Te has registrado correctamente. Inicia sesión para empezar a disfutar de la aplicación',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        navigate(`/login`);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al registrarse" + error,
          });
        }).finally(setLoading(false));

        
    };
    return (
      <>
        <h1>Registrarse</h1>
        <Container style={appCard} className="d-flex justify-content-center align-items-center my-5">
        <Form className="formulario" onSubmit={handleSubmit}>
        <Form.Group className="my-3" controlId="formBasicEmail">
          <Form.Label>Identificador de usuario</Form.Label>
          <Form.Control required name="Id" type="text" value={form.Id} onChange={handleChange} placeholder="Id" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control required name="Username" type="text" value={form.Username} onChange={handleChange} placeholder="Usuario" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control required name="Nombre" type="text" value={form.Nombre} onChange={handleChange} placeholder="Nombre" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Codigo de activación</Form.Label>
          <Form.Control required name="Codigo" type="text" value={form.Codigo} onChange={handleChange} placeholder="Codigo" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control required name="Acceso" type="password" value={form.Acceso} onChange={handleChange} placeholder="Contraseña" />
        </Form.Group>
        <Row className="mt-5 mb-2 mx-auto justify-content-center">
          <Button className="boton botonGrande" variant="primary" type="submit">
            Registrarse
          </Button>
        </Row>
        <Row className="botonsecundario mb-3 mx-auto justify-content-center">
        <Button className="botonCancelar botonGrande" variant="secondary" onClick={() => navigate("/")}>
            Atrás
          </Button>
        </Row>
      </Form>
      </Container>
      <LoadingModal show={loading} />
      </>
      );
}