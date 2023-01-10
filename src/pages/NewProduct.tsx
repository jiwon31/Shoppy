import { uploadImage } from "api/image_uploader";
import Button from "components/ui/Button";
import useProducts from "hooks/useProducts";
import { useState } from "react";
import { InputProduct } from "types/product";

const initialProduct: InputProduct = {
  id: "",
  name: "",
  price: "",
  category: "",
  description: "",
  options: "",
  image: "",
};

export default function NewProduct() {
  const [product, setProduct] = useState<InputProduct>(initialProduct);
  const [file, setFile] = useState<File | null | undefined>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const { addProduct } = useProducts();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file!)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("성공적으로 제품이 추가되었습니다.");
              setTimeout(() => setSuccess(null), 4000);
            },
          }
        );
      })
      .finally(() => {
        setIsUploading(false);
        setProduct(initialProduct);
        setFile(null);
      });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="clothes"
          className="w-1/3 mx-auto mb-2"
        />
      )}
      <form className="flex flex-col gap-2 px-12" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          value={product.name}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? "업로드중..." : "제품 등록하기"}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
