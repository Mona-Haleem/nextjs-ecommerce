"use client";

import { useCart } from "@/hooks/useCart";
import { CartItemData } from "@/lib/types";

export default function QuantityAdjust({ item }: { item: CartItemData }) {
  const { cartItems, updateCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (!cartItems || newQuantity < 1) return;

    const updatedItems = cartItems.items.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );

    updateCart.mutate(updatedItems);
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
