import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import AddToCartButton from "./cart/AddToCartBtn";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="border border-gray-300 rounded p-2 bg-gray-200  flex-col justify-between flex"
    >
      <div className="rounded p-2 relative aspect-[3/4]">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>
      <h2 className="text-sm font-bold mt-2 text-black">{product.title}</h2>
      <p className="text-xs text-gray-600">{product.category}</p>

      {product.discountPercentage > 0 && (
      <p className="flex gap-3 my-3">
          <span className="text-sm text-gray-400 line-through">
            ${product.price.toFixed(2)}
          </span>
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
            -{product.discountPercentage.toFixed(0)}% OFF
          </span>
      </p>
      )}
      <AddToCartButton product={product} />
    </Link>
  );
};

export default ProductCard;
