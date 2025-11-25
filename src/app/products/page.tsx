import ProductList from '@/componenets/ProductsList';
import { fetchProducts } from '@/lib/api/products';
import React from 'react'
export const dynamic = 'force-dynamic';
export const revalidate = 60; 

export const metadata = {
  title: "FakeStore - products",
};
export default async function Products() {
    const { products } = await fetchProducts();

    return (
      <div className="mx-auto p-8">
        <h1 className="text-3xl font-bold uppercase mb-6">All Products</h1>
        <ProductList products={products}/>
      </div>
    );
}
