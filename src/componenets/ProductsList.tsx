import ProductCard from "./productCard";
import { Product } from "@/lib/types";


export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {products?.map((product) => (<ProductCard key={product.id} product={product}/> ))}
    </div>
  );
}
