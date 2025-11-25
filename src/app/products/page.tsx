import ProductsPageClient from "@/componenets/Products/ProductsPageClient";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "FakeStore - Products",
  description: "Browse our complete product catalog"
};

export default async function ProductsPage() {


  return (
    <div className="min-h-screen bg-gray-50">
      <ProductsPageClient />
    </div>
  );
}