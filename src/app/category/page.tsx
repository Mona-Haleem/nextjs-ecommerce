// app/categories/page.tsx
import CategoryCard from '@/componenets/CategoryCard';
import { fetchCategories } from '@/lib/api/products';
export const dynamic = 'force-dynamic';
export const revalidate = 60; 
export const metadata = {
  title: "FakeStore - Categories",
};


const CategoriesPage = async () => {
  const  categories  = await fetchCategories();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Shop by Category</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories?.map((category: string) => (
         <CategoryCard key={category} category={category}/> 
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;