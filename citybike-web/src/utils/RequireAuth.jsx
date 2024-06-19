import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import { useAuth } from "../hooks/useAuth";
const RequireAuth = ({ children, userroles }) => {
    const {token,role,user } = useAuth();
    console.log(user,role,token)
    const location = useLocation();
    if (role) {
        if (userroles) {
            if (userroles.includes(role)) {
                return children
            } else {
                Swal.fire('Access Denied !', "", 'warning')
                return <Navigate to="/" />
            }
        } else {
            return children
        }
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}
export default RequireAuth