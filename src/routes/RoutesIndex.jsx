import Cart from "../Pages/Cart"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import PropTypes from "prop-types"
import Singup from "../Pages/Singup"
import Secret from "../Pages/Secret"
import ProductPage from "../Pages/ProductPage"
import { useAuthContext } from "../hooks/useAuth"
import { Route, Routes, Navigate } from "react-router-dom"

const RoutesIndex = ({searchTerm}) => { //rutas a todas las paginas de la aplicacion
    const {autenticated, userPayload} = useAuthContext()
    return (
        <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm}/>} />
            <Route path="/cart" element={autenticated ?<Cart /> : <Navigate to ="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<Singup />} />
            <Route path="/Secret" element={autenticated && userPayload?.role == 'ADMIN' ? <Secret /> : <Navigate to="/login" /> } />
            <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
        
    )
}
RoutesIndex.propTypes = {
    searchTerm: PropTypes.string.isRequired
  }
export default RoutesIndex