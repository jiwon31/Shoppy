import { useAuthContext } from "context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartProduct } from "types/product";
import CartRepository from "api/cart_repository";

const cartApi = new CartRepository();

export default function useCart() {
  const { user } = useAuthContext();
  const uid = user!.uid;
  const queryClient = useQueryClient();

  const cartQuery = useQuery<CartProduct[], Error>(
    ["carts", uid || ""],
    async () => cartApi.getCart(user!.uid),
    { staleTime: 1000 * 60, enabled: !!uid }
  );

  const addOrUpdateToCart = useMutation(
    (product: CartProduct) => cartApi.addOrUpdateToCart(uid, product),
    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    }
  );

  const removeFromCart = useMutation(
    (id: CartProduct["id"]) => cartApi.removeFromCart(uid, id),
    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    }
  );

  return { cartQuery, addOrUpdateToCart, removeFromCart };
}
