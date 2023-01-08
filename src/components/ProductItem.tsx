import { useNavigate } from "react-router-dom";
import { Product } from "types/product";

type ProductItemProps = { product: Readonly<Product> };

export default function ProductItem({
  product,
  product: { image, name, price, category, id },
}: ProductItemProps) {
  const navigate = useNavigate();

  return (
    <li
      className="shadow-md rounded-md overflow-hidden cursor-pointer hover:scale-105 ease-in duration-200"
      onClick={() => navigate(`/products/${id}`, { state: { product } })}
    >
      <img className="w-full" src={image} alt={name} />
      <div className="flex justify-between items-center mt-2 px-2">
        <h3 className="truncate">{name}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600 text-sm">{category}</p>
    </li>
  );
}
