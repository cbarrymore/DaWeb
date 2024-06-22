
 export const Home = () => {
   return (
     <>
        <h1>Home</h1>
        <button onClick={() => {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE2MGZiZDllZjk3MTRkMTg1NjdhYjVhOSIsIm5vbWJyZSI6Ikphdmllck51ZXZvIiwicm9sIjoiZ2VzdG9yIiwiZXhwIjoxNzIxNDg4NDU3fQ.XOUyIzNdsxVkzdhGXMMIIGnJMOCBQsAwEMjUnS6aX44");
          
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow"
          };
          
          fetch("http://localhost:8070/alquileres/usuarios/160fbd9ef9714d18567ab5a9/reservas", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        }}></button>
     </>
   )
 }

