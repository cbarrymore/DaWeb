import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRouteBase = ({ children, allowedRole }) => {
  const { user } = useAuth();
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const ProtectedRouteGestor = ({ children }) => (
  <ProtectedRouteBase allowedRole="Gestor">{children}</ProtectedRouteBase>
);

export const ProtectedRouteUsuario = ({ children }) => (
  <ProtectedRouteBase allowedRole="Usuario">{children}</ProtectedRouteBase>
);