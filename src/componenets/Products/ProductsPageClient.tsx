'use client';

import { useState } from 'react';
import { useInfiniteScroll } from '@/hooks/ProductsHooks/useInfinteScroll';
import { useProductsData } from '@/hooks/ProductsHooks/useProductsData';
import { useProductFilters } from '@/hooks/ProductsHooks/useProductsFilters';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ProductsHeader from './ProductsHeader';
import ProductsSidebar from './ProductsSideBar';
import ProductsGrid from './ProductsGrid';
import { useCategories } from '@/hooks/ProductsHooks/useCategories';

export default function ProductsPageClient() {
  const [showFilters, setShowFilters] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    clearFilters,
    hasActiveFilters,
  } = useProductFilters();

  const {
    products,
    total,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useProductsData({ search, selectedCategory, sortBy });

  const observerTarget = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <>
      <ProductsHeader
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 relative">
        <div className="flex gap-6 relative">
          <ProductsSidebar
            showFilters={showFilters}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onClose={() => setShowFilters(false)}
          />

          <main className="flex-1">
            <ProductsGrid
              products={products}
              total={total}
              loading={isLoading || isFetchingNextPage}
              hasMore={hasNextPage ?? false}
              hasActiveFilters={hasActiveFilters}
              observerRef={observerTarget}
              onClearFilters={clearFilters}
            />
          </main>
        </div>
      </div>
    </>
  );
}

