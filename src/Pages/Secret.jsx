import ProductCreator from "../components/ProductCreator"
import PlaceholderForImg from "../components/PlaceholderForImg"
import { useAuthContext } from "../hooks/useAuth"
import { useEffect, useState, useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import { getMyUserService, deleteAProduct } from "../services/UserServices"

const Secret = () => {
  const { userPayload } = useAuthContext() /* Admin o customer? */
  const [user, setUser] = useState("") /* Nombre de usuario */
  const { autenticated } = useAuthContext() /* Autenticado o no? */
  const { products, setProducts } = useContext(ProductContext) /* Productos */
const placeholderImage = 'https://http.cat/images/500.jpg'

  useEffect(() => {
    const fetchUserData = async () => { /* peticion para pedir los datos del usuario en especifico el nombre */
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const response = await getMyUserService(token)/* le pasa el dato TOKEN de inicio de sesion para pedir los datos */
          console.log("User data:", response.data)

          setUser(response.data.first_name) /* nombre de usuario */
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    if (autenticated) { /* si el usuario esta autenticado se ejecuta la funcion */
      fetchUserData();
    }
  }, [autenticated]); /* depende de que autenticated se alla realizado primero */

  const handleDeleteAProduct = async (productId) => { /* funcion para eliminar el producto */
    try {
      await deleteAProduct(productId) /* productId se le pasa a esta funcion en la linea 145 desde el boton de borrar producto */
      setProducts(remainProducts => remainProducts.filter(product => product.id !== productId)) /* se realiza un set a los productos filtrando los productos que no coinciden con el id proporcionado y borra el que si coincide */
      console.log(`Product ${productId}deleted successfully`);

    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }


  return (
    <>
      <div className="text-center">
        <h1>Product manager</h1>
        {
          userPayload?.role == 'ADMIN' /* si el rol es ADMIN le da la vienvenida si no solo sale un texto de que el no deveria de estar aqui */
            ? <h2>Hello {user}</h2>
            : <h2>You`re not suposed to be here</h2>

            
        }

        <ProductCreator /> {/* un boton que abre un modal para crear un nuevo producto */}

      </div>
      <div>
        {/* renderizado de los productos en la cual existe un boton para borrar el producto del sistema */}
        <div className='container my-3 '>

          <div className='row gap-3 '>
            {products?.map((product, id) => (

              <div key={id}
                className='card shadow-lg p-3 mb-5 bg-body-secondary rounded'
                style={{ width: "15.7rem", textDecoration: "none" }}
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

                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteAProduct(product.id)}
                >Delete this product
                </button>

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Secret