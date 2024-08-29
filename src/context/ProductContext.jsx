import { createContext, useState, useEffect } from "react";

const ProductContext = createContext()

const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const request = () => {
            fetch('https://proyecto-e-comerce-con-react-dev-f-33a.onrender.com/items')
                .then(res => res.json())
                .then(data => {
                    setProducts(data)
                   
                })
                .catch(err => console.log(err))
        }

        request()
    }, [])

  return (
    
    <ProductContext.Provider value={{products, setProducts}}>
        {children}
    </ProductContext.Provider>
  )
}


export { ProductContext, ProductProvider }
