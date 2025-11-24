import { Product } from '@/lib/types';
import ProductCard from '../productCard';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <div className="flex items-stretch h-100 overflow-x-scroll overflow-y-hidden space-x-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
