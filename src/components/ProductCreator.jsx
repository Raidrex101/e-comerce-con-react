import { useContext } from "react"
import { createProduct, getAllProducts } from "../services/UserServices"
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { ProductContext } from "../context/ProductContext"

const ProductCreator = () => {
    const navigate = useNavigate()
    const { products, setProducts } = useContext(ProductContext) // se declaran los productos para mapear las categorias en la linea 8 y el setProducts para setear el nuevo producto en la linea 14
    const category = [...new Set(products.map(product => product.category))] //se crea un set de las categorias de los productos al no permitir repeticiones solo se agregan las categorias unicas

    const onSubmit = async (newProduct) => { //se llama desde el boton del modal en la linea 126 para manejar el evento submit del modal
        try {
            const token = localStorage.getItem('token')// se obtiene el token desde el local storage para la peticion 
             await createProduct(newProduct, token)// se le pasan los datos del nuevo producto y del token a la peticion axios
            const response = await getAllProducts() //se realiza una nueva peticiion de todos los productos para que el nuevo se renderize de forma correcta ya que la respuesta de la peticion es un string y no un json con los datos del producto
            setProducts(response.data) //la respuesta es la nueva peticion de todos los productos para que el nuevo se renderize de forma correcta
            console.log('product created successfully')
            navigate('/')
            


        } catch (error) {
            console.error('Error creating the product', error)
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    return (
        <>
            <button //boton del modal
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#Modal" /* data-bs-target es como un get element by */
            >
                Add a new product
            </button>

            <div //el modal
                className="modal fade"
                id="Modal" //es lo que toma el data-bs-target
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header"> {/* header del modal */}
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Add all the following information
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="modal-body">{/* Body y el form */}
                                <div className='form-floating'>
                                    <input type='text'
                                        className='form-control'
                                        id='brand'
                                        name='brand'
                                        placeholder='brand'
                                        {...register('brand', { required: true })}
                                    />
                                    <label htmlFor='floatingInput'>Brand Name</label>
                                    {errors.brand && <span>Brand is required</span>}
                                </div>

                                <div className='form-floating'>
                                    <select
                                        className='form-control'
                                        id='category'
                                        name='Category'
                                        key={1}
                                        {...register('category', { required: true })}>

                                        {category?.map((category, id) => (
                                            <option key={id} value={category}>{category}</option> /* mapeo de las categorias del Set para seleccionatlas */
                                        ))}
                                    </select>
                                    <label htmlFor="gender">Category</label>
                                    {errors.category && <span>A category is required</span>}
                                </div>

                                <div className='form-floating'>
                                    <input type='text'
                                        className='form-control'
                                        id='image'
                                        name='image'
                                        placeholder='image'
                                        {...register('image', { required: true })}
                                    />
                                    <label htmlFor='floatingInput'>Image Url</label>
                                    {errors.image && <span>Image is required</span>}
                                </div>

                                <div className='form-floating'>
                                    <input type='text'
                                        className='form-control'
                                        id='description'
                                        name='description'
                                        placeholder='description'
                                        {...register('description', { required: true })}
                                    />
                                    <label htmlFor='floatingInput'>Description</label>
                                    {errors.image && <span>Description is required</span>}
                                </div>

                                


                                <div className='form-floating'>
                                    <input type='text'
                                        className='form-control'
                                        id='price'
                                        name='price'
                                        placeholder='price'
                                        {...register('price', { required: true })}
                                    />
                                    <label htmlFor='floatingInput'>Price</label>
                                    {errors.price && <span>Price is required</span>}
                                </div>

                                <div className='form-floating'>
                                    <input type='text'
                                        className='form-control'
                                        id='product_name'
                                        name='product_name'
                                        placeholder='product_name'
                                        {...register('product_name', { required: true })}
                                    />
                                    <label htmlFor='floatingInput'>Product Name</label>
                                    {errors.product_name && <span>Product name is required</span>}
                                </div>

                                <div className="modal-footer"> {/* footer del modal */}
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button type="submit"
                                        className="btn btn-primary"
                                        data-bs-dismiss="modal">
                                        create a Product
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCreator;
