import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../api/productsAPI"

function Products() {
  const { isLoading, data:products, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: products=>products.sort((a,b)=> b.id - a.id)
  })

  if (isLoading) return <div>Is Loading...</div>
  else if (isError) return <div> Error:{error.message} </div>

  return products.map(product => (
    <>
      <h1>{product.name}</h1>
      <p>Price:{product.price}</p>
      {/* <p>Stock: {product.stock ? "Disponible" : "Enfalta"}</p> */}
      <button
      onClick={()=>{
        console.log(product.id)
      }}
      >Delete</button>
      <input type="checkbox"/>
      <label>Stock</label>
    </>
  ))

}

export default Products