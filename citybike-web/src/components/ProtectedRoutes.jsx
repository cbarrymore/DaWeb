import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from 'prop-types';

const ProtectedRouteBase = ({ children, allowedRole }) => {
  const { user } = useAuth();
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

ProtectedRouteBase.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRole: PropTypes.string.isRequired,
};

export const ProtectedRouteGestor = ({ children }) => (
  <ProtectedRouteBase allowedRole="Gestor">{children}</ProtectedRouteBase>
);
ProtectedRouteGestor.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ProtectedRouteUsuario = ({ children }) => (
  <ProtectedRouteBase allowedRole="Usuario">{children}</ProtectedRouteBase>
);
ProtectedRouteUsuario.propTypes = {
  children: PropTypes.node.isRequired,
};