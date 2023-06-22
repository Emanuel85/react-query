import axios from "axios";

const productApi = axios.create(
    {
        baseURL: "http://localhost:3000"
    })

export const getProducts = async () => {
    const res = await productApi.get('/products')
    return res.data
}

export const createProduct = (product) => productApi.post('/products', product)

export const deleteProduct = id => productApi.delete(`/products/${id}`)

export const updateProduct = (product) => productApi.put(`/products/${product.id}`,product)