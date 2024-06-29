import Gateway from "../configs/constants";

export   const fetchEstacion = async (id) => {
  const token = localStorage.getItem("token")
  const uri = Gateway + `/estaciones/${id}`
  const myHeaders = new Headers()
  myHeaders.append("Authorization", "Bearer " + token)
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  const response = await fetch(uri, requestOptions);
  if(!response.ok){
      const errorMessage = await response.text()
      throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
    }
    const data = await response.json()
    return data
}

export const fetchEstaciones = async (page, stationsPerPage) => {
    const token = localStorage.getItem("token");
    const uri = Gateway + `/estaciones?page=${page}&size=${stationsPerPage}`;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    console.log(uri);
    const response = await fetch(uri, requestOptions);
    if(!response.ok){
        const errorMessage = await response.text()
        throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
      }
      const data = await response.json()
      return data

}

    export const deleteEstacion = async (id) => {
    const token = localStorage.getItem("token");
    const uri = Gateway + `/estaciones/${id}`;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };
    const response = await fetch(uri, requestOptions)
    if(!response.ok){
      const errorMessage = await response.text()
      throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
    }
};


export const fetchBicicletas = async (idEstacion, page, bicisPerPage) => {
    let uri = Gateway + `/estaciones/${idEstacion}/bicis`;
    const token = localStorage.getItem("token");
    if(localStorage.getItem("role") === "usuario")
    {
        uri += `/disponibles`
    }
    uri += `?page=${page}&size=${bicisPerPage}`
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    const response = await fetch(uri, requestOptions)
    if(!response.ok){
      const errorMessage = await response.text()
      throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
    }
    const data = await response.json()
    return data
}

export const darAltaBici = async (idEstacion, modelo) => {
    const token = localStorage.getItem("token")
    const uri = Gateway + `/estaciones/${idEstacion}/bicis/?modelo=${modelo}`
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    myHeaders.append('Content-Type', 'x-www-form-urlencoded;charset=UTF-8')
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body : modelo,
      redirect: "follow",
    }
    const response = await fetch(uri, requestOptions)
    if(!response.ok){
      const errorMessage = await response.text()
      throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
    }
}

export const darBajaBici = async (idEstacion, codigoBici, motivo) => {
const uri = Gateway +  `/estaciones/${idEstacion}/bicis/${codigoBici}?motivoBaja=${motivo}`;
const myHeaders = new Headers();
const token = localStorage.getItem("token")
myHeaders.append("Authorization", "Bearer "+token);
const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  redirect: "follow"
};
const response = await fetch(uri, requestOptions)
if(!response.ok){
const errorMessage = await response.text()
throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
}
}
export const crearEstacion = async (estacion) => {
const token = localStorage.getItem("token")
const uri = Gateway + `/estaciones`
const myHeaders = new Headers()
myHeaders.append("Authorization", "Bearer " + token)
myHeaders.append('Content-Type', 'application/json')
const requestOptions = {
method: "POST",
headers: myHeaders,
body : JSON.stringify(estacion),
redirect: "follow",

}
const response = await fetch(uri, requestOptions)
if(!response.ok){
const errorMessage = await response.text()
throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
}
}

export const modificarEstacion = async (estacion, id) => {
const token = localStorage.getItem("token")
const uri = Gateway + `/estaciones/${id}`
estacion.id = id;
const myHeaders = new Headers()
myHeaders.append("Authorization", "Bearer " + token)
myHeaders.append('Content-Type', 'application/json')
const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body : JSON.stringify(estacion),
  redirect: "follow",
}
const response = await fetch(uri, requestOptions)
if(!response.ok){
  const errorMessage = await response.text()
  throw new Error(`HTTP error! status: ${response.status}}\n${errorMessage}`)
}
}