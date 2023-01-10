export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  options: string[];
  image: string;
};

export type CartProduct = Product & {
  option: string;
  quantity: number;
};

export type InputProduct = {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  options: string;
  image: string;
};
