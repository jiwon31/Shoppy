import { Product, InputProduct } from "types/product.d";
import { ref, set, get } from "firebase/database";
import { database } from "./firebase";
import { v4 as uuid } from "uuid";
export default class ProductRepository {
  async getProducts(): Promise<Product[]> {
    return get(ref(database, "products")) //
      .then((snapshot) => {
        if (snapshot.exists()) {
          return Object.values(snapshot.val());
        }
        return [];
      });
  }

  async addNewProduct(product: InputProduct, image: string): Promise<void> {
    const converted = this.convertToProductType(product, image);
    return set(ref(database, `products/${converted.id}`), converted);
  }

  private convertToProductType(product: InputProduct, image: string): Product {
    const id = uuid();
    return {
      ...product,
      id,
      price: parseInt(product.price),
      options: product.options.split(","),
      image,
    };
  }
}
