import { useLocation } from "react-router-dom";
import { Product } from "types/product";
import { useState, useEffect } from "react";
import Button from "components/ui/Button";
import useCart from "hooks/useCart";

export default function ProductDetail() {
  const product: Readonly<Product> = useLocation().state.product;
  const { category, description, image, name, options, price } = product;
  const [selectedOption, setSelectedOption] = useState<string>(
    options && options[0]!
  );
  const [success, setSuccess] = useState<string | null>(null);
  const { addOrUpdateToCart } = useCart();

  const handleClick = () => {
    addOrUpdateToCart.mutate(
      {
        ...product,
        option: selectedOption,
        quantity: 1,
      },
      {
        onSuccess: () => {
          setSuccess("장바구니에 추가되었습니다");
          setTimeout(() => setSuccess(null), 4000);
        },
      }
    );
  };

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <p className="mx-10 mt-4 text-gray-700">&gt;{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full basis-6/12 px-4" src={image} alt={name} />
        <div className="w-full basis-6/12 p-4 flex flex-col">
          <h2 className="text-2xl font-extrabold py-2">{name}</h2>
          <p className="text-xl font-bold py-2 border-b border-gray-400">
            ₩{price}
          </p>
          <p className="py-3">{description}</p>
          <div className="flex items-center">
            <label className="text-indigo-400 font-bold" htmlFor="select">
              옵션:
            </label>
            <select
              className="p-1 m-4 flex-1 border-2 border-indigo-400 border-dashed outline-none"
              id="select"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedOption(e.target.value)
              }
              value={selectedOption}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button text="장바구니에 추가" onClick={handleClick} />
          {success && <p className="my-2 text-center">✅ {success}</p>}
        </div>
      </section>
    </>
  );
}
