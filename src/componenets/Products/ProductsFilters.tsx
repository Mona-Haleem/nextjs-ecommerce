'use client';

import { CategoryIcon } from '@/componenets/categoryIcon';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center gap-2 ${
              !selectedCategory
                ? 'bg-blue-50 text-blue-700 font-medium border-2 border-blue-200'
                : 'hover:bg-gray-50 text-gray-700 border-2 border-transparent'
            }`}
          >
            <span className="text-xl">📦</span>
            <span>All Categories</span>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition capitalize flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-blue-50 text-blue-700 font-medium border-2 border-blue-200'
                  : 'hover:bg-gray-50 text-gray-700 border-2 border-transparent'
              }`}
            >
              <CategoryIcon 
                category={category} 
                size={20} 
                color={selectedCategory === category ? '#1d4ed8' : '#374151'} 
              />
              <span>{category.replace(/-/g, ' ')}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Use the search bar to find specific products, or combine filters for better results.
        </p>
      </div>
    </div>
  );
}