"use client";

import { useCart } from "@/hooks/useCart";

export default function ItemRemoval({ itemId }: { itemId: number }) {
  const { updateCart } = useCart();

  const handleRemoveItem = () => {
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]").filter(
      (item: any) => item.id !== itemId
    );
    updateCart.mutate(updatedCart);
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
