import ProductForm from "./ProductForm"

const Products = () => {
  return (
    <div>
      <ProductForm handleFormSubmit={() => undefined} isLoading={false}/>
    </div>
  )
}

export default Products