import { useContext } from "react"
import notFound from '../img/500.jpg'
import { useAuthContext } from '../hooks/useAuth'
import { CartContext } from "../context/CartContext"
import { ProductContext } from "../context/ProductContext"
import { useParams, useNavigate } from "react-router-dom"

const ProductPage = () => {
    const {id} = useParams()//id del producto desde la url dinamica
    const {products} = useContext(ProductContext)
    const { autenticated } = useAuthContext()
    const navigate = useNavigate()
    const { addProduct } = useContext(CartContext)

    const product = products.find(product => product.id === id)
    if (!product) { //existe un rpoducto con este id?
        return (
            <>
            <div className='container text-center py-5'>
                <img src={notFound}
                style={{ height: "500px" }}
                className="rounded mx-auto d-block"
                alt="Even the image was not found :(" 
                 />
                <h1>Product not found</h1> {/* si no existe */}
            </div>
            </>
        )
    }
  return (
    <div className='container text-center'>
            <h1>{product.product_name}</h1>
            <img 
            style={{ height: "500px" }} src={product.image} alt={notFound} />
            <br />
            <strong>Price: ${product.price}</strong>
            <br />
            <strong>{product.description}</strong>
            <br />
            {autenticated ? (
                <>
                <button 
                onClick={() => addProduct(product)} className="btn btn-primary">Add to cart</button>{/* agrega al carrito el producto */}
                </>
            )
            : (
                <>
                 <button onClick={() => navigate("/login")}>
                    Login or signup to add to cart
                </button>
                </>
            )}
            
        </div>
  )
}

export default ProductPage
