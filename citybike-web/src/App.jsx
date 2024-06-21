import './App.css'
import {Home} from './Routes/Home.jsx'
import { Layout } from './Layout.jsx'
import {Estaciones} from './Routes/Estaciones.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { LoginPage } from './Routes/Login.jsx'
import { AuthLayout } from './AuthLayout.jsx'
import {userRoles as ur} from './data/userRoles.jsx'
import RequireAuth from './utils/RequireAuth.jsx'
import RedirectIfLogged from './utils/RedirectIfLogged.jsx'
import Estacion, {loader as estacionLoader,} from './components/Estacion.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<AuthLayout/>}>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='estaciones' element={<RequireAuth><Estaciones/></RequireAuth>}>
      </Route>
      <Route path='estaciones/:id' loader={estacionLoader} element={<RequireAuth><Estacion/></RequireAuth>}/>
      <Route path='estaciones/editar/:id' loader={estacionLoader} element={<RequireAuth><Estacion/></RequireAuth>}/>
      <Route path='login' element={<RedirectIfLogged><LoginPage/></RedirectIfLogged>}/>
    </Route> 
  </Route>
  ))


function App() {
  // const [user, setUser] = useState(null);

  // const login = (userData) => {
  //   setUser(userData);
  // };

  // const logout = () => {
  //   setUser(null);
  // };


  return (
      <RouterProvider router={router}>
      </RouterProvider>  )
}

export default App
