import { IoClose } from 'react-icons/io5';

interface ActiveFiltersProps {
  search: string;
  selectedCategory: string;
  onClearSearch: () => void;
  onClearCategory: () => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  search,
  selectedCategory,
  onClearSearch,
  onClearCategory,
  onClearAll,
}: ActiveFiltersProps) {
  return (
    <div className="flex items-center gap-2 mt-4 flex-wrap">
      <span className="text-sm text-gray-600">Active filters:</span>
      
      {search && (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
          Search: {search}
          <IoClose size={14} className="cursor-pointer hover:text-blue-600" onClick={onClearSearch} />
        </span>
      )}
      
      {selectedCategory && (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2 capitalize">
          {selectedCategory}
          <IoClose size={14} className="cursor-pointer hover:text-blue-600" onClick={onClearCategory} />
        </span>
      )}
      
      <button
        onClick={onClearAll}
        className="text-sm text-red-600 hover:text-red-800 underline ml-2"
      >
        Clear all
      </button>
    </div>
  );
}
