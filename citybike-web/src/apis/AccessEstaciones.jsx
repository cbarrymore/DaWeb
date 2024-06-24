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
