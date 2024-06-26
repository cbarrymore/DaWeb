import Gateway from "../configs/constants";

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
    try{
        const response = await fetch(uri, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(err){
        if (err.name === "AbortError") {
            alert(
                "Fetch aborted by user action (browser stop button, closing tab, etc.",
            );
        } else if (err.name === "TypeError") {
            alert("AbortSignal.timeout() method is not supported");
        } else {
            // A network error, or some other problem.
            alert(`Error: type: ${err.name}, message: ${err.message}`);
        }
    }

}


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
    fetch(uri, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
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
    try{
        const response = await fetch(uri, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(err){
        if (err.name === "AbortError") {
            alert(
                "Fetch aborted by user action (browser stop button, closing tab, etc.",
            );
        } else if (err.name === "TypeError") {
            alert("AbortSignal.timeout() method is not supported");
        } else {
            // A network error, or some other problem.
            alert(`Error: type: ${err.name}, message: ${err.message}`);
        }
    }
  }