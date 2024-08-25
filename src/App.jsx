import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
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

            <RoutesIndex searchTerm={searchTerm} />

          </BrowserRouter>

        </AuthProvider>


      </ProductProvider>
    </>
  )
}

export default App
