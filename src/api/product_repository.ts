import { Product } from "types/product";
import { ref, set, get } from "firebase/database";
import { database } from "./firebase";
import { v4 as uuid } from "uuid";

interface ProductRepository {
  getProducts: () => Promise<Product[]>;
  addNewProduct: (product: Product, image: string) => Promise<void>;
}

export default class ProductRepositoryImpl implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    return get(ref(database, "products")) //
      .then((snapshot) => {
        if (snapshot.exists()) {
          return Object.values(snapshot.val());
        }
        return [];
      });
  }

  async addNewProduct(product: Product, image: string): Promise<void> {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
      ...product,
      id,
      image,
    });
  }
}
