
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import {useContext, useMemo } from "react";
import { useLocalStorage } from './useLocalStorage';
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [token, setToken] = useLocalStorage("token", null);
    const [role, setRole] = useLocalStorage("role", null);
    const [id, setId] = useLocalStorage("id", null);
    const navigate = useNavigate();
  
    // call this function when you want to authenticate the user
    const login = async (data) => {
      console.log(data);
      setToken(data.token);
      setRole(data.role);
      setUser(data.username);
      setId(data.id);
      navigate("/");
    };
  
    // call this function to sign out logged in user
    const logout = () => {
      setUser(null);
      setToken(null);
      setRole(null);
      setId(null);
      navigate("/", { replace: true });
    };
  
    const value = useMemo(
      () => ({
        user,
        id,
        token,
        role,
        login,
        logout,
      }),
      [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export function useAuth() {
  return useContext(AuthContext);
}