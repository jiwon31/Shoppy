import { CartProduct } from "types/product";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useCart from "hooks/useCart";

type CartProductItemProps = { product: Readonly<CartProduct> };

const ICON_CLASS =
  "transition-all cursor-pointer hover:text-indigo-400 hover:scale-105 mx-1";

export default function CartProductItem({
  product,
  product: { id, image, name, option, quantity, price },
}: CartProductItemProps) {
  const { addOrUpdateToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleMius = () => {
    if (quantity < 2) return;
    addOrUpdateToCart.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    addOrUpdateToCart.mutate({ ...product, quantity: quantity + 1 });
  };
  const handleDelete = () => {
    removeFromCart.mutate(id);
  };

  const handleItemClick = () =>
    navigate(`/products/${product.id}`, { state: { product } });

  return (
    <li className="flex items-center justify-between">
      <img
        className="w-24 md:w-48 rounded-md cursor-pointer"
        src={image}
        alt={name}
        onClick={handleItemClick}
      />
      <div
        className="flex-1 ml-3 text-sm md:text-base cursor-pointer transition-all hover:opacity-70"
        onClick={handleItemClick}
      >
        <p className="font-semibold">{name}</p>
        <p className="text-indigo-400 font-semibold">{option}</p>
        <p className="text-xs md:text-sm">₩{price}</p>
      </div>
      <div className="flex items-center gap-2">
        <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMius} />
        <span>{quantity}</span>
        <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
        <BsFillTrashFill className={ICON_CLASS} onClick={handleDelete} />
      </div>
    </li>
  );
}
