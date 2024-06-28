import { useContext, useState } from "react";
import Gateway from "../configs/constants"
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Form, Row } from "react-bootstrap";
import "./Registrarse.css"


const registrarUsuario = async (usuario) => {
    alert(JSON.stringify(usuario))
      const token = localStorage.getItem("token")
      const uri = Gateway + `/usuarios`
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body : JSON.stringify(usuario),
        redirect: "follow",
      
      }
      const response = await fetch(uri, requestOptions)
      if(!response.ok){
        const errorMessage = await response.text()
        throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
      }
}

export const Registrarse = () =>{
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
        registrarUsuario(form)
        setForm({
            Id: '',
            Username: '',
            Nombre: '',
            Codigo: '',
            Acceso: ''
        });
        navigate(`/estaciones`)
    };
    return (
        <Container>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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
        <Row className="botonprincipal mt-5 mb-2 mx-auto">
          <Button variant="primary" type="submit">
            Registrarse
          </Button>
        </Row>
        <Row className="botonsecundario mx-auto">
        <Button variant="secondary" onClick={() => navigate("/")}>
            Atrás
          </Button>
        </Row>
      </Form>
      </Container>
      );
}