import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

const RedirectIfLogged= ({children})=>{
    const {token} = useAuth();
    console.log(token)
    if(token){
        console.log(token)
        return <Navigate to="/" />
    }
    return children;

}

RedirectIfLogged.propTypes = {
    children: PropTypes.node.isRequired
};

export default RedirectIfLogged;