"use client";

import { CartItemData, Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { cartItems, updateCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItems) return;

    setIsAdding(true);

    const existingItem = cartItems.items.find(
      (item: CartItemData) => item.id === product.id
    );

    let updatedItems: CartItemData[];

    if (existingItem) {
      // Update quantity
      updatedItems = cartItems.items.map((item:Product & {quantity:number}) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Add new item
      updatedItems = [...cartItems.items, { ...product, quantity: 1 }];
    }

    // const updatedCart = {
    //   ...cartItems,
    //   items: updatedItems,
    // };

    updateCart.mutate(updatedItems, {
      onSuccess: () => setIsAdding(false),
      onError: () => setIsAdding(false),
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
