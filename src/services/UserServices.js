import axios from "axios"

const Main_URL = 'https://ecommerce-json-jwt.onrender.com'

const registerUser = (data) => axios.post(`${Main_URL}/register`, data)

const loginUser = (data) => axios.post(`${Main_URL}/login`, data)

const deleteAProduct = (id) => axios.delete(`${Main_URL}/items/${id}`)
const getMyUserService = (jwt) => axios.get(`${Main_URL}/users/me`, {
    
    headers: {
        Authorization: `Bearer ${jwt}`
    }
})

const createProduct = (productData, token) => axios.post(`${Main_URL}/items`, productData, {

    headers: {
        Authorization: `Bearer ${token}`
    }
})
 //aqui se guardan todas las peticiones axios para tenerlas en un solo lugar

export {//se expertan para utilizarse donde se necesite
    registerUser,
    loginUser, 
    getMyUserService,
    deleteAProduct,
    createProduct,
 
}