import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import RoutesIndex from './routes/RoutesIndex'
import Navbar from './components/Index'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <ProductProvider>

        <BrowserRouter>

          <Navbar setSearchTerm={setSearchTerm}/>

          <RoutesIndex searchTerm={searchTerm}/>

        </BrowserRouter>

      </ProductProvider>
    </>
  )
}

export default App
