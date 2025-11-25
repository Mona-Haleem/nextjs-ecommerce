import ProductsPageClient from "@/componenets/Products/ProductsPageClient";

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
  console.log(params)
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductsPageClient />
    </div>

  );
};

export default CategoryPage;

