"use client";

import { useCart } from "@/hooks/useCart";
import { useSession } from "next-auth/react";

export default function ItemRemoval({ itemId }: { itemId: number }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { cart, removeFromCart } = useCart(userId);

  const handleRemoveItem = () => {
    if (!cart) return;

    removeFromCart(itemId);
  };

  return (
    <button onClick={handleRemoveItem} className="text-red-500 hover:underline">
      Remove
    </button>
  );
}
