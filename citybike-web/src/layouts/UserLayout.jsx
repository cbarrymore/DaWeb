import { useOutlet } from "react-router-dom";
import { AuthProvider, useAuth } from "../hooks/useAuth";
import UserContext from "../contexts/UserContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
export const UserLayout = () => {
  const outlet = useOutlet();
  const [reserva, setReserva] = useLocalStorage("reserva", null);
  const [alquiler, setAlquiler] = useLocalStorage("alquiler", null);
  const { user, id, token, role, login, logout } = useAuth();

  return (
    <UserContext.Provider value={{reserva,setReserva,alquiler,setAlquiler}}>{outlet}</UserContext.Provider>
  );
};