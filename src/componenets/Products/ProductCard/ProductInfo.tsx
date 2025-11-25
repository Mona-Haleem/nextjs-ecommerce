import { ProductPrice } from './ProductPrice';

interface ProductInfoProps {
  category: string;
  title: string;
  brand?: string;
  price: number;
  discountPercentage: number;
}

export function ProductInfo({ category, title, brand, price, discountPercentage }: ProductInfoProps) {
  return (
    <div className="p-3 flex-1 flex flex-col">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        {category.replace(/-/g, ' ')}
      </p>
      
      <h2 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h2>
      
      {brand && (
        <p className="text-xs text-gray-600 mb-2">{brand}</p>
      )}
      
      <div className="flex-1" />
      
      <div className="mt-2">
        <ProductPrice price={price} discountPercentage={discountPercentage} />
      </div>
    </div>
  );
}
