import { IoClose } from 'react-icons/io5';
import ProductFilters from './ProductsFilters';

interface ProductsSidebarProps {
  showFilters: boolean;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onClose: () => void;
}

export default function ProductsSidebar({
  showFilters,
  categories,
  selectedCategory,
  setSelectedCategory,
  onClose,
}: ProductsSidebarProps) {
  return (
    <aside
      className={`${
        showFilters ? 'fixed top:10 inset-0 z-10  bg-opacity-50 lg:relative lg:bg-transparent' : 'hidden'
      } lg:block lg:w-64 flex-shrink-0 max-w-64`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`${
          showFilters ? 'fixed left-0 top-50 max-w-64' : ''
        } bg-white h-fit lg:sticky lg:top-[145px] rounded-lg shadow-sm  p-4 overflow-y-auto max-h-[calc(100vh-180px)]`}
      >
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </aside>
  );
}
