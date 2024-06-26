import { Container, Navbar, Row, Stack } from "react-bootstrap"
import { useAuth } from "../hooks/useAuth"

export const DebugComponent = () => {
  const { user, token, role, id } = useAuth()

  return (
    <Navbar fixed="top" expand="lg" bg="dark" variant="dark" className="topnav" >
      <Stack direction="horizontal" className=" mx-auto">
          <Navbar.Brand>Usuario: {user}</Navbar.Brand>
          <Navbar.Brand>Rol: {role}</Navbar.Brand>
          <Navbar.Brand>Id: {id}</Navbar.Brand>
      </Stack>
    </Navbar>
  )
}
