import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductImage } from "./ProductCard/ProductImage";
import { ProductInfo } from "./ProductCard/ProductInfo";
import AddToCartButton from "../cart/AddToCartBtn";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      <Link href={`/products/${product.id}`} className="flex-1 flex flex-col">
        <ProductImage
          src={product.thumbnail}
          alt={product.title}
          discountPercentage={product.discountPercentage}
          stock={product.stock}
          rating={product.rating}
        />
        
        <ProductInfo
          category={product.category}
          title={product.title}
          brand={product.brand}
          price={product.price}
          discountPercentage={product.discountPercentage}
        />
      </Link>
      
      <div className="p-3 pt-0">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}