import PropTypes from 'prop-types'
import PlaceholderForImg from '../components/PlaceholderForImg'
import { useContext, useState} from 'react'
import { useAuthContext } from '../hooks/useAuth'
import { CartContext } from '../context/CartContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import HomeCart from '../components/HomeCart'


const Home = ({ searchTerm = '' }) => {
    const { products } = useContext(ProductContext)//trae todos los productos
    const { autenticated } = useAuthContext()//trae el estado de autenticacion
    const { addProduct, cart } = useContext(CartContext)//trae el estado del carrito para agrega los productos
    const navigate = useNavigate()//para redireccionar
    const placeholderImage = 'https://http.cat/images/500.jpg'
    

    const [clickedProduct, setClickedProduct] = useState(null);

    const handleClick = (product) => {
        addProduct(product);
        setClickedProduct(product.id)// Se activa el estado clickedProduct al agregar un producto al carrito
        setTimeout(() => {
            setClickedProduct(null)// Se desactiva el estado clickedProduct al pasar 1 segundo
        }, 1000)
    }
    // Resetea el estado de isClicked después de 1/2 segundo
   


    const filtered = products?.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase().trim())//fuancion para la busqueda
    )


    return (
        
        <div className='container-fluid mt-3'>
            <div className='row'>
                {cart.length === 0 ? (
                   
                    <>
                        <div className='container my-3'>
                <div className='row gap-3'>
                    {filtered.length === 0 ? (
                        <h1 className='text-center'>No products found</h1>
                    ) : (
                        filtered.map((product, id) => (//utiliza la funcion de filtrado para renderizar los productos, si no hay termino de busqueda renderiza todos los productos
                            <div
                                className='card shadow-lg p-3 mb-5 bg-body-secondary rounded d-flex flex-column'
                                style={{ width: "15.7rem" }}
                                key={id}
                            >
                                <NavLink
                                    style={{ textDecoration: "none", color: "black" }}
                                    to={`/product/${product.id}`} //url dinamica dependiendo del id del producto
                                >


                                    <PlaceholderForImg
                                        src={product.image}
                                        alt={product.product_name}
                                        notFoundSrc={placeholderImage}
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
                                        className={`btn ${clickedProduct === product.id ? 'btn-success' : 'btn-primary'}`}
                                            onClick={() => handleClick(product)}>{clickedProduct === product.id ? 'Added to cart' : 'Add to cart'}</button>
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
                ) : (
                    // Cuando el carrito tiene 1 o más artículos
                    <>
                        <div className='col-md-9'>
                            <div className='row'>
                                {filtered.length === 0 ? (
                                    <h1 className='text-center'>No products found</h1>
                                ) : (
                                    filtered.map((product, id) => (
                                        <div
                                            className='card shadow-lg p-3 mb-5 bg-body-secondary rounded d-flex flex-column'
                                            style={{ width: "15.7rem" }}
                                            key={id}
                                        >
                                            <NavLink
                                                style={{ textDecoration: "none", color: "black" }}
                                                to={`/product/${product.id}`}
                                            >
                                                <PlaceholderForImg
                                                    src={product.image}
                                                    alt={product.product_name}
                                                    notFoundSrc={placeholderImage}
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
                                                        className={`btn ${clickedProduct === product.id ? 'btn-success' : 'btn-primary'}`}
                                                        onClick={() => handleClick(product)}
                                                    >
                                                        {clickedProduct === product.id ? 'Added to cart' : 'Add to cart'}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => navigate("/login")}
                                                        className='btn btn-primary'
                                                    >
                                                        Login or signup to add to cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <HomeCart />
                        </div>
                    </>
                )}
            </div>
        </div>
            
        
    )
}

Home.propTypes = {
    searchTerm: PropTypes.string
}

export default Home
