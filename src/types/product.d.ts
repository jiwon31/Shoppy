export type Product = {
  id: string;
  name: string;
  price: number | 0;
  category: string;
  description: string;
  options: string[];
  image: string;
};

export type CartProduct = Product & {
  option: string;
  quantity: number;
};
