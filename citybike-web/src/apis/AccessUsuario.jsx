import Gateway from "../configs/constants";

    export const registrarUsuario = async (usuario) => {
        const token = localStorage.getItem("token")
        const uri = Gateway + `/usuarios`
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body : JSON.stringify(usuario),
        redirect: "follow",
        
        }
        const response = await fetch(uri, requestOptions)
        if(!response.ok){
        const errorMessage = await response.text()
        throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
        }
    }
    export const getUsuarios = async () => {
        const token = localStorage.getItem("token")
        const uri = Gateway + `/usuarios/all`
        const myHeaders = new Headers()
        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        
        }
        const response = await fetch(uri, requestOptions)
        if(!response.ok){
        const errorMessage = await response.text()
        throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
        }
        const data = await response.json()
        return data
    }