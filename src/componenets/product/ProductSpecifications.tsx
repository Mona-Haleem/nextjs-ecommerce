import { Product } from "@/lib/types";

interface ProductSpecificationsProps {
  product: Product;
}

export default function ProductSpecifications({ product }: ProductSpecificationsProps) {
  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
      
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Dimensions */}
        {product.dimensions && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Dimensions</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Width:</span>
                <span className="font-medium">{product.dimensions.width} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Height:</span>
                <span className="font-medium">{product.dimensions.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Depth:</span>
                <span className="font-medium">{product.dimensions.depth} cm</span>
              </div>
            </div>
          </div>
        )}

        {/* Product Details */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">SKU:</span>
              <span className="font-medium">{product.sku}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight:</span>
              <span className="font-medium">{product.weight} kg</span>
            </div>
            {product.brand && (
              <div className="flex justify-between">
                <span className="text-gray-600">Brand:</span>
                <span className="font-medium">{product.brand}</span>
              </div>
            )}
            {product.meta?.barcode && (
              <div className="flex justify-between">
                <span className="text-gray-600">Barcode:</span>
                <span className="font-medium font-mono text-xs">{product.meta.barcode}</span>
              </div>
            )}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Availability</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Stock:</span>
              <span className="font-medium">{product.stock} units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium">{product.availabilityStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Min. Order:</span>
              <span className="font-medium">{product.minimumOrderQuantity} units</span>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Policies</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Warranty:</span>
              <span className="font-medium">{product.warrantyInformation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-medium">{product.shippingInformation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Returns:</span>
              <span className="font-medium">{product.returnPolicy}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}