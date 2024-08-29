import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import PayOut from "../components/PayOut"

const Cart = () => {
  const { cart, addProduct, removeProduct } = useContext(CartContext)
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0) //calcula el precio total del carrito


  return (
    <>
      <div className="container">
        <main className="border">
          <div className="row g-5 text-center">

            <h2>Checkout</h2>

          </div>
          
          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span>Your cart</span>
                <span className="badge bg-primary rounded-pill">{cart.reduce((total, item) => total + item.quantity, 0)}</span> {/* calcula el total de productos */}
              </h4>
              <ul className="list-group mb-3">

                {cart.length === 0 ? (
                  <li className="list-group-item d-flex justify-content-between lh-sm">

                    <h6 className="my-0">Your cart is empty</h6>

                  </li>
                ) : (
                  cart.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">{item.product_name} <span className="badge bg-primary rounded-pill">{item.quantity}</span></h6>
                        <img src={item.image} style={{ width: "90px" }} alt="No image aviable" />
                      </div>
                      <div className="d-flex align-items-center">

                        <button
                          className="btn btn-outline-success me-2"
                          onClick={() => addProduct(item)}>+ {/* puedes agragar mas del mismo producto desde el carrito */}
                          
                        </button>

                        <button
                          className="btn btn-outline-danger me-2"
                          onClick={() => removeProduct(item.id)}>{/* puedes remover el producto o duplicados del mismo desde el carrito */}
                          -</button>

                      </div>

                      <span className="text-body-secondary">${item.price}</span>

                    </li>

                  ))
                )}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${totalPrice}</strong> {/* renderiza el precio total */}
                </li>
              </ul>

            </div>
            <PayOut />
          </div>
        </main>
      </div>

      
    </>




  )
}

export default Cart
