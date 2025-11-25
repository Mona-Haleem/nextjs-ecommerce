import { Product } from '@/lib/types';
import ProductList from '../ProductsList';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="space-y-4 w-full">
      <h2 className="text-2xl font-semibold">Featured Products</h2>

      <div className="flex w-full space-x-5 overflow-x-auto pb-4 gap-6">
       <ProductList products={products}/>
      </div>

    </section>
  );
}
