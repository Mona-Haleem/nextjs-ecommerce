import ProductList from "@/componenets/ProductsList";
import { fetchProductsByCategory } from "@/lib/api/products";

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

  const { products } = await fetchProductsByCategory(category);
  return (
    <div className="mx-auto p-8">
      <h1 className="text-2xl font-bold uppercase mb-6">{category}</h1>
      <ProductList products={products}/>
    </div>
  );
};

export default CategoryPage;
