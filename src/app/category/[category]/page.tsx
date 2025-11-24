import ProductCard from '@/componenets/productCard';
import { Product } from '@/lib/types';
import axios from 'axios';


type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return {
    title: `${category} - FakeStore`,
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;

  const { data: products } = await axios.get(
    `https://fakestoreapi.com/products/category/${category}`
  );

  return (
    <div className="mx-auto p-8">
      <h1 className="text-2xl font-bold uppercase mb-6">{category}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
