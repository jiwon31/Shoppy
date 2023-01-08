import useCart from "hooks/useCart";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-2xl" />
      {products && (
        <p className="w-6 h-6 text-center text-white bg-indigo-400 rounded-full absolute -top-3 -right-3">
          {products.length}
        </p>
      )}
    </div>
  );
}
