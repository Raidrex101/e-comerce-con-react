import { useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ProductContext } from "../context/ProductContext"
import { useAuthContext } from '../hooks/useAuth'
import notFound from '../img/500.jpg'
const ProductPage = () => {
    const {id} = useParams()
    const {products} = useContext(ProductContext)
    const { autenticated } = useAuthContext()
    const navigate = useNavigate()

    const product = products.find(product => product.id === id)
    if (!product) {
        return (
            <>
            <div>
                <img src={notFound}
                alt="Even the image was not found :(" 
                 />
                <h1>Product not found</h1>
            </div>
            </>
        )
    }
  return (
    <div className='container'>
            <h1>{product.product_name}</h1>
            <img src={product.image} alt={notFound} />
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            {autenticated ? (
                <>
                <button>Add to cart</button>
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
