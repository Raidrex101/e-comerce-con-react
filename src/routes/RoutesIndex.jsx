import { Route, Routes } from "react-router-dom"
import PropTypes from "prop-types"
import Home from "../Pages/Home"
import Cart from "../Pages/Cart"
import Login from "../Pages/Login"
import Singup from "../Pages/Singup"
import ProductPage from "../Pages/ProductPage"

const RoutesIndex = ({searchTerm}) => {
    return (
        <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm}/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<Singup />} />
            <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
        
    )
}
RoutesIndex.propTypes = {
    searchTerm: PropTypes.string.isRequired
  }
export default RoutesIndex