interface ProductBadgesProps {
  discountPercentage: number;
  stock: number;
}

export function ProductBadges({ discountPercentage, stock }: ProductBadgesProps) {
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-2">
      {discountPercentage > 0 && (
        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded shadow">
          -{discountPercentage.toFixed(0)}% OFF
        </span>
      )}
      {stock < 10 && stock > 0 && (
        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded shadow">
          Low Stock
        </span>
      )}
      {stock === 0 && (
        <span className="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded shadow">
          Out of Stock
        </span>
      )}
    </div>
  );
}
