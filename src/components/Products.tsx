import ProductItem from "components/ProductItem";
import useProducts from "hooks/useProducts";

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 😣</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-4 p-4">
        {products &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
