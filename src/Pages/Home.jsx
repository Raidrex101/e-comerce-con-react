import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import notFound from '../img/500.jpg'
const Home = () => {

    const [search, setSearch] = useState([])
    useEffect(() => {
        const request = () => {
            fetch('https://proyecto-e-comerce-con-react-dev-f-33a.onrender.com/items')
                .then(res => res.json())
                .then(data => {
                    setSearch(data)
                    console.log(data)
                }

                )
                .catch(err => console.log(err))
        }

        request()
    }, [])


    return (

        <div>
            <Navbar/>
            <div className='container my-3 '>
                <div className='row gap-3 '>
                    {search.map(product => (
                        <div key={product.id} className='card shadow-lg p-3 mb-5 bg-body-secondary rounded jus'style={{ width: "15.7rem" }}>
                            <img
                                src={product.image}
                                className='card-img-top'style={{ height: "200px" }}
                                alt={product.id}
                                onError={(e) => {
                                    e.target.onError = null; e.target.src = notFound
                                }} />
                            <div className='card-body ju'>
                                <h5 className='card-title'>{product.product_name}</h5>
                                <p className='card-text'>${product.price}</p>
                                <button className='btn btn-primary'>Añadir al carrito</button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>


        </div>

        

    )
}

export default Home
