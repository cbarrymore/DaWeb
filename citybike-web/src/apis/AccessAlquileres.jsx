import Gateway from "../configs/constants"

export const crearReserva = async (idBici) => {
  const token = localStorage.getItem("token")
  const idUser = localStorage.getItem("id")

  const uri = Gateway + `/alquileres/usuarios/${idUser}/reservas?idBici=${idBici}`
  const myHeaders = new Headers()
  myHeaders.append("Authorization", "Bearer " + token)
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow"
  };
  const response = await fetch(uri, requestOptions)
    if(!response.ok){
      const errorMessage = await response.text()
      throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
    }
    if (response.status === 204) {
      return
    }
  const data = await response.json()
  return data
}

export const confirmarReserva = async () => {
  const token = localStorage.getItem("token")
  const idUser = localStorage.getItem("id")

  const uri = Gateway + `/alquileres/usuarios/${idUser}/reservas`
  const myHeaders = new Headers()
  myHeaders.append("Authorization", "Bearer " + token)
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow"
  };
  const response = await fetch(uri, requestOptions)
  if (response.status === 204) {
    return
  }
  if(!response.ok){
    const errorMessage = await response.text()
    throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
  }
  const data = await response.json()
  return data
}

export const cancelarReserva = async () => {
  const token = localStorage.getItem("token")
  const idUsuario = localStorage.getItem("id")

  const uri = Gateway + `/alquileres/usuarios/${idUsuario}/reservas`
  const myHeaders = new Headers()
  myHeaders.append("Authorization", "Bearer " + token)
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  const response = await fetch(uri, requestOptions)
  if (response.status === 204) {
    return
  }
  if(!response.ok){
    const errorMessage = await response.text()
    throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
  }
  const data = await response.json()
  return data
}


export const alquilarBicicleta = async (idBici) => {
  const token = localStorage.getItem("token")
  const idUser = localStorage.getItem("id")

  const uri = Gateway + `/alquileres/usuarios/${idUser}?idBici=${idBici}`
  const myHeaders = new Headers()
  myHeaders.append("Authorization", "Bearer " + token)
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow"
  };
  const response = await fetch(uri, requestOptions)
    if(!response.ok){
      const errorMessage = await response.text()
      throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
    }
    if (response.status === 204) {
      return
    }
  const data = await response.json()
  return data
}

export const dejarBicicleta = async (idEstacion) => {
    const token = localStorage.getItem("token")
    const idUser = localStorage.getItem("id")

    const uri = Gateway + `/alquileres/usuarios/${idUser}`
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    const urlencoded = new URLSearchParams();
    urlencoded.append("idEstacion", idEstacion);
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    }
    const response = await fetch(uri, requestOptions)
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    if (response.status === 204) {
      return
    }
    const data = await response.json()
    return data
   

  }


export const fetchUserInfo = async () => {
    const token = localStorage.getItem("token")
    const idUser = localStorage.getItem("id")

    const uri = Gateway + `/alquileres/usuarios/${idUser}`
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
    try {
      const response = await fetch(uri, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (err) {
      if (err.name === "AbortError") {
        alert(
          "Fetch aborted by user action (browser stop button, closing tab, etc."
        )
      } else if (err.name === "TypeError") {
        alert("AbortSignal.timeout() method is not supported")
      } else {
        // A network error, or some other problem.
        alert(`Error: type: ${err.name}, message: ${err.message}`)
      }
    }
  }


