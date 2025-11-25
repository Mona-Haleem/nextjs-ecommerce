"use client";

import { Product } from "@/lib/types";
import { useState } from "react";
import AddToCartButton from "./AddToCartBtn";
import QuantitySelector from "./QuantitySelector";

interface AddToCartWithQuantityProps {
  product: Product;
  maxQuantity?: number;
}

export default function AddToCartWithQuantity({ 
  product,
  maxQuantity 
}: AddToCartWithQuantityProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  // Use product stock or provided maxQuantity
  const max = maxQuantity || product.stock || 99;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-semibold text-gray-700">
          Quantity:
        </label>
        <QuantitySelector
          min={1}
          max={max}
          initialValue={1}
          onChange={setSelectedQuantity}
          size="md"
        />
      </div>

      <AddToCartButton
        product={product} 
        quantity={selectedQuantity}
        showQuantity
      />
      
      {product.stock && product.stock < 10 && (
        <p className="text-sm text-orange-600">
          Only {product.stock} left in stock!
        </p>
      )}
    </div>
  );
}