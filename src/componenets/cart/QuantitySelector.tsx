"use client";

import { useCart } from "@/hooks/useCart";

export default function QuantityAdjust({ item }: { item: any }) {
  const { updateCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return; 
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedItem = updatedCart.map((cartItem: any) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    updateCart.mutate(updatedItem);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleQuantityChange(item.quantity - 1)}
        className="border px-3 py-1 rounded-md"
      >
        -
      </button>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => handleQuantityChange(+e.target.value)}
        className="w-12 text-center border p-1 rounded-md"
        min="1"
      />
      <button
        onClick={() => handleQuantityChange(item.quantity + 1)}
        className="border px-3 py-1 rounded-md"
      >
        +
      </button>
    </div>
  );
}
