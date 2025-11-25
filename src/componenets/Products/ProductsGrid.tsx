import { BiSearch } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ProductList from '@/componenets/ProductsList';
import { Product } from '@/lib/types';

interface ProductsGridProps {
  products: Product[];
  total: number;
  loading: boolean;
  hasMore: boolean;
  hasActiveFilters: boolean;
  observerRef: React.RefObject<HTMLDivElement>;
  onClearFilters: () => void;
}

export default function ProductsGrid({
  products,
  total,
  loading,
  hasMore,
  hasActiveFilters,
  observerRef,
  onClearFilters,
}: ProductsGridProps) {
  if (products.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <BiSearch size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
        <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  if (products.length === 0 && loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {products.length} of {total} products
        </p>
      </div>

      <ProductList products={products} />

      <div ref={observerRef} className="py-8 flex justify-center">
        {loading && (
          <div className="flex items-center gap-2 text-gray-600">
            <AiOutlineLoading3Quarters className="animate-spin" size={24} />
            <span>Loading more products...</span>
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-gray-500">You&apos;ve reached the end of the list</p>
        )}
      </div>
    </>
  );
}
