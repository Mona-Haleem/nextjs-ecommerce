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
  
    const handleAddToCart = (e:React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault()
        e.stopPropagation()
     console.log(e)
      setIsAdding(true);
      let itemInCartQuantity = cartItems.find((item:CartItemData) => item.id == product.id)
      let quantity = itemInCartQuantity? itemInCartQuantity.quantity + 1 :1;   
      const updatedCart = cartItems ? [...cartItems, {...product,quantity}] : [{...product,quantity}];
  
      updateCart.mutate(updatedCart, {
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