// components/ProductInfo.tsx
import { Product } from '@/lib/types';
import { ReactNode } from 'react';
import AddToCartButton from '../cart/AddToCartBtn';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.title}
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
            {product.category}
          </span>
          <span className="text-gray-500">SKU: {product.sku}</span>
          {product.brand && (
            <span className="text-gray-500">Brand: {product.brand}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-lg">★</span>
          <span className="font-semibold text-gray-900">{product.rating.toFixed(1)}</span>
          <span className="text-gray-500">({product.reviews?.length || 0} reviews)</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          product.stock > 10 
            ? 'bg-green-100 text-green-700' 
            : product.stock > 0 
            ? 'bg-yellow-100 text-yellow-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {product.availabilityStatus} ({product.stock} in stock)
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-purple-600">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-xl text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="px-2 py-1 bg-red-500 text-white text-sm font-semibold rounded">
                -{product.discountPercentage.toFixed(0)}% OFF
              </span>
            </>
          )}
        </div>
        {product.minimumOrderQuantity > 1 && (
          <p className="text-sm text-gray-600 mt-2">
            Minimum order: {product.minimumOrderQuantity} units
          </p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {product.tags && product.tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag:ReactNode, idx:number) => (
              <span 
                key={idx} 
                className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <AddToCartButton product={product} />

      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Warranty:</span>
          <span className="font-medium text-gray-900">{product.warrantyInformation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-medium text-gray-900">{product.shippingInformation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Return Policy:</span>
          <span className="font-medium text-gray-900">{product.returnPolicy}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Weight:</span>
          <span className="font-medium text-gray-900">{product.weight} kg</span>
        </div>
      </div>
    </div>
  );
}