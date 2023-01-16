import { AiFillPlusCircle } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";
import { Price } from "./ui/Price";

const SHIPPING = 3000;

export default function TotalPrice({ totalPrice }: { totalPrice: number }) {
  return (
    <section className="flex justify-between items-center py-10 px-4 md:px-8 lg:px-24">
      <Price title="상품 총액" price={totalPrice} />
      <AiFillPlusCircle className="shrink-0" />
      <Price title="배송비" price={SHIPPING} />
      <FaEquals className="shrink-0" />
      <Price title="총가격" price={totalPrice + SHIPPING} />
    </section>
  );
}
