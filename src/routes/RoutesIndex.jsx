import { Route, Routes, Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuth"
import Secret from "../Pages/Secret"
import PropTypes from "prop-types"
import Home from "../Pages/Home"
import Cart from "../Pages/Cart"
import Login from "../Pages/Login"
import Singup from "../Pages/Singup"
import ProductPage from "../Pages/ProductPage"

const RoutesIndex = ({searchTerm}) => {
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