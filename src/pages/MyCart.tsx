import CartProductItem from "components/CartProductItem";
import TotalPrice from "components/TotalPrice";
import Button from "components/ui/Button";
import useCart from "hooks/useCart";

export default function MyCart() {
  const {
    cartQuery: { isLoading, error, data: products },
  } = useCart();

  const hasProducts = products && products.length > 0;
  const totalPrice = products
    ? products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0)
    : 0;

  return (
    <section className="flex flex-col">
      <h2 className="text-xl text-center font-bold my-4">내 장바구니</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 😣</p>}
      {!hasProducts && (
        <p className="text-center my-6">장바구니에 상품이 없습니다.</p>
      )}
      {hasProducts && (
        <>
          <ul className="w-full flex flex-col gap-3 p-4 px-8 border-y border-gray-300">
            {products &&
              products.map((product) => (
                <CartProductItem key={product.id} product={product} />
              ))}
          </ul>
          <TotalPrice totalPrice={totalPrice} />
        </>
      )}
      <Button text="주문하기" />
    </section>
  );
}
