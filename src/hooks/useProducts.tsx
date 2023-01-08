import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductRepositoryImpl from "api/product_repository";
import { Product } from "types/product";

const productApi = new ProductRepositoryImpl();

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<Product[], Error>(
    ["products"],
    productApi.getProducts,
    { staleTime: 1000 * 60 }
  );

  const addProduct = useMutation(
    ({ product, url }: { product: Product; url: string }) =>
      productApi.addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  return { productsQuery, addProduct };
}
