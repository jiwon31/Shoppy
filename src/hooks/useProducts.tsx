import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductRepository from "api/product_repository";
import { InputProduct, Product } from "types/product";

export default function useProducts(productApi = new ProductRepository()) {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<Product[], Error>(
    ["products"],
    productApi.getProducts,
    { staleTime: 1000 * 60 }
  );

  const addProduct = useMutation(
    ({ product, url }: { product: InputProduct; url: string }) =>
      productApi.addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  return { productsQuery, addProduct };
}
