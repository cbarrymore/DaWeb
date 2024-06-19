import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Gateway from "../configs/constants"
import { useLocation, useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = async (e) => {
    e.preventDefault();
    const controller = new AbortController();    
    // Cancel the fetch request in 500ms
    setTimeout(() => controller.abort(), 500);
    

    const path = Gateway + "/auth/login?" + "username=" + username + "&password=" + password;
    
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(2000)
    };
    
    try{
      const response= await fetch(path, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      data.username = username
      console.log(data)
      login(data)
      navigate(from, { replace: true });
    }
    catch(err){
      if (err.name === "TimeoutError") {
        alert("Timeout: It took more than 2 seconds to get the result!");
      } else if (err.name === "AbortError") {
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
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};