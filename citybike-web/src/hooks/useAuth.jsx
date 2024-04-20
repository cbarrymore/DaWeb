
import {UserContext} from './../UserContext';
import { useNavigate } from "react-router-dom";
import {useContext, useMemo } from "react";
import { useLocalStorage } from './useLocalStorage';
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();
  
    // call this function when you want to authenticate the user
    const login = async (data) => {
      setUser(data);
      navigate("/profile");
    };
  
    // call this function to sign out logged in user
    const logout = () => {
      setUser(null);
      navigate("/", { replace: true });
    };
  
    const value = useMemo(
      () => ({
        user,
        login,
        logout,
      }),
      [user]
    );
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  };
  
  export const useAuth = () => {
    return useContext(UserContext);
  };