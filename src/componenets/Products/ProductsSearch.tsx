'use client';

import { FiSearch, FiX } from 'react-icons/fi';

interface ProductSearchProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function ProductSearch({ search, setSearch }: ProductSearchProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <FiX  size={20} />
        </button>
      )}
    </div>
  );
}