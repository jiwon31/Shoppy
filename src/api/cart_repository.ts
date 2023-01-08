import { CartProduct } from "../types/product";
import { ref, set, get, remove } from "firebase/database";
import { database } from "./firebase";

interface CartRepository {
  getCart: (userId: string) => Promise<CartProduct[]>;
  addOrUpdateToCart: (userId: string, product: CartProduct) => Promise<void>;
  removeFromCart: (userId: string, productId: string) => Promise<void>;
}

export default class CartRepositoryImpl implements CartRepository {
  async getCart(userId: string): Promise<CartProduct[]> {
    return get(ref(database, `carts/${userId}`)) //
      .then((snapshot) => {
        if (snapshot.exists()) {
          const items = snapshot.val() || {};
          return Object.values(items);
        }
        return [];
      });
  }

  async addOrUpdateToCart(userId: string, product: CartProduct): Promise<void> {
    return set(ref(database, `carts/${userId}/${product.id}`), product);
  }

  async removeFromCart(userId: string, productId: string): Promise<void> {
    return remove(ref(database, `carts/${userId}/${productId}`));
  }
}
