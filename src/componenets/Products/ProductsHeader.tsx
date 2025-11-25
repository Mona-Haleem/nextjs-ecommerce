import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import ActiveFilters from './ActiveFilters';
import ProductSearch from './ProductsSearch';
import ProductSort from './ProductsSort';

interface ProductsHeaderProps {
  search: string;
  setSearch: (search: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  onToggleFilters: () => void;
}

export default function ProductsHeader({
  search,
  setSearch,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  hasActiveFilters,
  clearFilters,
  onToggleFilters,
}: ProductsHeaderProps) {
  return (
    <div className="bg-white sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <button
            onClick={onToggleFilters}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <HiAdjustmentsHorizontal size={20} />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start lg:items-center justify-between">
          <ProductSearch search={search} setSearch={setSearch} />
          <ProductSort sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {hasActiveFilters && (
          <ActiveFilters
            search={search}
            selectedCategory={selectedCategory}
            onClearSearch={() => setSearch('')}
            onClearCategory={() => setSelectedCategory('')}
            onClearAll={clearFilters}
          />
        )}
      </div>
    </div>
  );
}
