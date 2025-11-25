'use client';

import { HiArrowsUpDown } from 'react-icons/hi2';

interface ProductSortProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function ProductSort({ sortBy, setSortBy }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <HiArrowsUpDown size={20} className="text-gray-600" />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  );
}