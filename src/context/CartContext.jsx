import { createContext, useState } from "react"

const CartContext = createContext()// para crear el context

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]) //contenedor de los productos en el carrito

    const addProduct = (product) => {
        setCart(prevCart => {
            const duplicated = prevCart.find(item => item.id === product.id)//verifica si el producto ya existe en el carrito
            if (duplicated) {
                return prevCart.map(item => item.id === product.id //verifica si el producto ya existe en el carrito
                    ? {...item, quantity: item.quantity + 1} //si el producto ya existe en el carrito, aumenta la cantidad y se crea la key quantity
                    : item)//
            } else {
                return [...prevCart, {...product, quantity: 1}]//si el producto no existe en el carrito lo agrega
            }
        })
    }

    const removeProduct = (productId) => {//remueve el producto del carrito
        setCart(prevCart => {
            const product = prevCart.find(item => item.id === productId)//verifica si el producto ya existe en el carrito
            if (product && product.quantity > 1) {//si el producto ya existe en el carrito, y la cantidad es mayor a 1, disminuye la cantidad
                return prevCart.map(item => item.id === productId
                    ? {...item, quantity: item.quantity - 1}
                    : item)
            } else {
                return prevCart.filter(item => item.id !== productId)//si el producto ya existe en el carrito, y la cantidad es 1, lo elimina
            }
        })
    }

    return (
        <CartContext.Provider value={{ cart, addProduct, removeProduct }}>{/* se pasa en el context el carrito y las funciones para agregar y remover para usarse en los componentes*/}
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
