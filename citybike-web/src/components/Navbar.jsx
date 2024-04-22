import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const  {user,logout} = useAuth()
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {user !== null  && (
          <li>
            <Link onClick={logout} to="/">Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Navbar