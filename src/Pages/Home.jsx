import { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import notFound from '../img/500.jpg'
const Home = ({ searchTerm = '' }) => {
    const {products} = useContext(ProductContext)

    useEffect(() => {
        // Este useEffect se ejecutará cada vez que productos cambien
        console.log('Products updated:', products);
    }, [products]);
    
    

    const filtered = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    )



    return (
        <>

            <div>
                <div className='container my-3 '>
                    <div className='row gap-3 '>
                        {filtered.length === 0 ?
                            (<h1>No products found</h1>) :
                            filtered.map(product => (

                                <NavLink className='card shadow-lg p-3 mb-5 bg-body-secondary rounded'
                                    style={{ width: "15.7rem", textDecoration: "none" }}
                                    key={product.id}
                                    to={`/product/${product.id}`}>
                                    <img
                                        src={product.image}
                                        className='card-img-top' style={{ height: "200px" }}
                                        alt='Error loading image, image link may be broken'
                                        onError={(e) => {
                                            e.target.src = notFound
                                        }} />
                                    <div className='card-body text-center'>
                                        <h5 className='card-title'>{product.product_name}</h5>
                                    </div>
                                    <div className='text-center'>
                                        <h5 className='card-text'>${product.price}</h5>
                                    </div>
                                </NavLink>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

Home.propTypes = {
    searchTerm: PropTypes.string
}

export default Home
