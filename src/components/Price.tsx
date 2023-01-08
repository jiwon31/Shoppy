type PriceProps = {
  title: string;
  price: number;
};

export default function Price({ title, price }: PriceProps) {
  return (
    <div className="bg-gray-50 p-8 mx-2 rounded-2xl text-center text-lg md:text-xl">
      <p className="text-sm">{title}</p>
      <h2 className="text-lg font-bold text-indigo-400">₩{price}</h2>
    </div>
  );
}
