import { useContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Gateway from "../configs/constants"
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { fetchUserInfo } from "../apis/AccessAlquileres";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import LoadingModal from "../components/LoadingModal";


export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {reservas,setReservas,alquiler,setAlquiler , updateUserContext} = useContext(UserContext)

  
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const path = Gateway + "/auth/login?" + "username=" + username + "&password=" + password;
    
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(5000)
    };
    
    try{
      const response= await fetch(path, requestOptions)
      if(!response.ok){
        if (response.status === 50) {
          Swal.fire({
            title: "Error",
            text: "Usuario o contraseña incorrectos",
            icon: "error",
          });
          return;
        }
        const errorMessage = await response.text()
        throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
      }
      const data = await response.json()
      data.username = username
      console.log(data)
      login(data)
      updateUserContext()
      navigate(from, { replace: true });
    }
    catch(err){
      Swal.fire({
        title: "Error",
        text: "Error al iniciar sesión. Vuelva a intentarlo\n" + err.message,
        icon: "error",
      });
      setLoading(false);
    }
    setLoading(false);
  };

  return ( 
    <Container>
      <Form onSubmit={handleLogin}>
        <Form.Group className="m-3" controlId="formBasicEmail">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control required name="username" type="text" value={username}  onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" />
        </Form.Group>
        <Form.Group className="m-3 mb-5" controlId="formBasicEmail">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control required name="password" type="password" value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
      <LoadingModal show={loading} />
    </Container>
  );
};