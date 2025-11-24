"use client";

import { useCart } from "@/hooks/useCart";
import { Product } from "@/lib/types";

export default function ItemRemoval({ itemId }: { itemId: number }) {
  const { cartItems, updateCart } = useCart();

  const handleRemoveItem = () => {
    if (!cartItems) return;

    const updatedItems = cartItems.items.filter(
      (item:Product) => item.id !== itemId
    );

    updateCart.mutate(updatedItems);
  };

  return (
    <button
      onClick={handleRemoveItem}
      className="text-red-500 hover:underline"
    >
      Remove
    </button>
  );
}
