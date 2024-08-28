import PropTypes from 'prop-types'
import notFound from '../img/500.jpg'
import { useContext } from 'react'
import { useAuthContext } from '../hooks/useAuth'
import { CartContext } from '../context/CartContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'

const Home = ({ searchTerm = '' }) => {
    const { products } = useContext(ProductContext)//trae todos los productos
    const { autenticated } = useAuthContext()//trae el estado de autenticacion
    const { addProduct } = useContext(CartContext)//trae el estado del carrito para agrega los productos
    const navigate = useNavigate()//para redireccionar



    const filtered = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase().trim())//fuancion para la busqueda
    )



    return (
        <>
        <div className='container my-3'>
            <div className='row gap-3'>
                {filtered.length === 0 ? (
                    <h1 className='text-center'>No products found</h1>
                ) : (
                    filtered.map(product => (//utiliza la funcion de filtrado para renderizar los productos, si no hay termino de busqueda renderiza todos los productos
                        <div 
                            className='card shadow-lg p-3 mb-5 bg-body-secondary rounded d-flex flex-column'
                            style={{ width: "15.7rem" }}
                            key={product.id}
                        >
                            <NavLink 
                                style={{ textDecoration: "none", color: "black" }}
                                to={`/product/${product.id}`} //url dinamica dependiendo del id del producto
                            >
                                <img
                                    src={product.image}
                                    className='card-img-top' 
                                    style={{ height: "200px" }}
                                    alt='Error loading image, image link may be broken'
                                    onError={(e) => {
                                        e.target.src = notFound
                                    }} 
                                />
                                <div className='card-body text-center'>
                                    <h5 className='card-title'>{product.product_name}</h5>
                                </div>
                                <div className='text-center'>
                                    <h5 className='card-text'>${product.price}</h5>
                                </div>
                            </NavLink>
                            <div className='text-center mt-auto'>
                                {autenticated ? (
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => addProduct(product)}>Add to cart</button>
                                ) : (
                                    <button
                                        onClick={() => navigate("/login")}
                                        className='btn btn-primary'>
                                        Login or signup to add to cart
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        </>
    )
}

Home.propTypes = {
    searchTerm: PropTypes.string
}

export default Home
