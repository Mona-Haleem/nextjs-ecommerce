interface ProductPriceProps {
  price: number;
  discountPercentage: number;
}

export function ProductPrice({ price, discountPercentage }: ProductPriceProps) {
  const discountedPrice = price * (1 - discountPercentage / 100);
  
  if (discountPercentage > 0) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-gray-900">
          ${discountedPrice.toFixed(2)}
        </span>
        <span className="text-sm text-gray-400 line-through">
          ${price.toFixed(2)}
        </span>
      </div>
    );
  }
  
  return (
    <span className="text-lg font-bold text-gray-900">
      ${price.toFixed(2)}
    </span>
  );
}
