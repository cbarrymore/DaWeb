import { useContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Gateway from "../configs/constants"
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { fetchUserInfo } from "../apis/AccessAlquileres";
import { Button, Container, Form } from "react-bootstrap";
import { appCard } from "../utils/ComponentsStyles";
import "../utils/generalStyles.css";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {reservas,setReservas,alquiler,setAlquiler , updateUserContext} = useContext(UserContext)
  
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const controller = new AbortController();    
    // Cancel the fetch request in 500ms
    setTimeout(() => controller.abort(), 500);
    

    const path = Gateway + "/auth/login?" + "username=" + username + "&password=" + password;
    
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(2000)
    };
    
    try{
      const response= await fetch(path, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      data.username = username
      console.log(data)
      login(data)
      updateUserContext()
      navigate(from, { replace: true });
    }
    catch(err){
      if (err.name === "TimeoutError") {
        alert("Timeout: It took more than 2 seconds to get the result!");
      } else if (err.name === "AbortError") {
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

  return ( 
    <>
    <h1>Inicia Sesión</h1>
    <Container fluid className="d-flex justify-content-center align-items-center my-5" >
      <Form onSubmit={handleLogin} className="p-5 formulario" style={appCard}>
        <Form.Group className="m-3" controlId="formBasicEmail">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control required name="username" type="text" value={username}  onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" />
        </Form.Group>
        <Form.Group className="m-3 mb-5" controlId="formBasicEmail">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control required name="password" type="password" value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        </Form.Group>
        <Button type="submit" className="boton">Login</Button>
      </Form>
    </Container>
    </>
  );
};