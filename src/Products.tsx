import { useAppSelector } from './hooks'
import ProductList from './ProductList'

const Products = () => {
  //   const products = useAppSelector((state) => state.filterProducts.items);
  //   const filteredCategory = useAppSelector((state) => state.filterProducts.filteredItems) ?? [];
  //  const displayedProducts = filteredCategory.length > 0 
  //         ? products.filter((product: any) => filteredCategory.includes(product.category))
  //         : products;
  // return (
  //   <><div style={{display: 'flex', justifyContent: 'center'}}><h1>{
  //     filteredCategory.length > 0 ? `Filtered Products - ${displayedProducts.length}` : `Product Lists - ${displayedProducts.length}`}</h1></div><ProductList /></>
  // )
  return (
    <div style={{ margin: '20px 0' }}>
      <ProductList />
    </div>
  )
}

export default Products