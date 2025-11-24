import FeaturedProducts from '@/componenets/home/FeaturedProducts';
import HeroSection from '@/componenets/home/HeroSction';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/lib/types';

export const metadata = {
  title: "FakeStore",
};

export default async function Home() {
  const  products  = await fetchProducts();
  return (
    <main className="w-full mx-auto p-8 space-y-12">
      <HeroSection images={products.map((product: Product) => product.image)} />
      <FeaturedProducts products={products} />
    </main>
  );
}
