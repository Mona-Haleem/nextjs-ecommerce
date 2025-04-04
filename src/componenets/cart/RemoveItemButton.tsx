"use client";

import { useCart } from "@/hooks/useCart";

export default function ItemRemoval({ itemId }: { itemId: number }) {
  const { cartItems, updateCart } = useCart();

  const handleRemoveItem = () => {
    if (!cartItems) return;

    const updatedItems = cartItems.items.filter(
      (item) => item.id !== itemId
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
