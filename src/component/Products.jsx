import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteProduct, getProducts, updateProduct } from "../api/productsAPI"

function Products() {

  const queryClient = useQueryClient()

  const { isLoading, data: products, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: products => products.sort((a, b) => b.id - a.id)
  })

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Delete product")
      queryClient.invalidateQueries()
    }
  })

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log("Update product")
      queryClient.invalidateQueries()
    }
  })


  if (isLoading) return <div>Is Loading...</div>
  else if (isError) return <div> Error:{error.message} </div>

  return products.map(product => (
    <>
      <h1>{product.name}</h1>
      <p>Price:{product.price}</p>
      {/* <p>Stock: {product.stock ? "Disponible" : "Enfalta"}</p> */}
      <button
        onClick={() => {
          deleteProductMutation.mutate(product.id)
        }}
      >Delete</button>
      <input type="checkbox"
        checked={product.InStock}
        onChange={(e) => {
          updateProductMutation.mutate({
            ...product,
            InStock: e.target.checked
          })
        }} />
      <label htmlFor={product.id}>Stock</label>
    </>
  ))

}

export default Products