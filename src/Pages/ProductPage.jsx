import { useContext } from "react"
import { useParams } from "react-router-dom"
import { ProductContext } from "../context/ProductContext"
import NotFound from "../img/500.jpg"
const ProductPage = () => {
    const {id} = useParams()
    const products = useContext(ProductContext)

    const product = products.find(product => product.id === id)
    if (!product) {
        return (
            <>
            <div>
                <img src={NotFound} alt="Even the image was not found :(" />
                <h1>Product not found</h1>
            </div>
            </>
        )
    }
  return (
    <div className='container'>
            <h1>{product.product_name}</h1>
            <img src={product.image} alt={NotFound} />
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
        </div>
  )
}

export default ProductPage
