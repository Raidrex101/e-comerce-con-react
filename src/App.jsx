import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import RoutesIndex from './routes/RoutesIndex'
import Navbar from './components/Index'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <ProductProvider>

        <AuthProvider>

          <BrowserRouter>

            <Navbar setSearchTerm={setSearchTerm} />

            <CartProvider>

              <RoutesIndex searchTerm={searchTerm} />

            </CartProvider>

          </BrowserRouter>

        </AuthProvider>

      </ProductProvider>
    </>
  )
}

export default App
