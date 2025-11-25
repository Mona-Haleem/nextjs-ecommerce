// components/AddToCartButton.tsx
"use client";

import { useCartActions, useCartSelectors } from "@/hooks/CartHooks";
import { Product } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useState, memo } from "react";
import { FiShoppingCart, FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  className?: string;
  showQuantity?: boolean;
  variant?: "default" | "icon" | "text";
};

// Memoized to prevent unnecessary re-renders
const AddToCartButton = memo(function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  showQuantity = false,
  variant = "default",
}: AddToCartButtonProps) {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [justAdded, setJustAdded] = useState(false);
  // Only subscribe to what we need
  const { isInCart, getItemQuantity } = useCartSelectors(userId);
  const { addToCart, isUpdating } = useCartActions(userId, {
    onSuccess: () => {
      setJustAdded(true);
      toast.success("Added to cart!");
      setTimeout(() => setJustAdded(false), 2000);
    },
    onError: (error) => {
      toast.error("Failed to add to cart");
      console.error(error);
    },
  });

  // Don't render if not logged in
  if (status === "unauthenticated" || !userId) {
    return null;
  }

  if (status === "loading") {
    return (
      <button
        disabled
        className={`px-6 py-3 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed ${className}`}
      >
        <FiLoader className="w-5 h-5 animate-spin inline-block mr-2" />
        Loading...
      </button>
    );
  }

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      toast.error("Please log in to add items to cart");
      return;
    }

    try {
      await addToCart(product, quantity);
    } catch (error) {
      // Error handled in hook
      console.log(error);
    }
  };

  const productInCart = isInCart(product.id);
  const currentQuantity = getItemQuantity(product.id);

  // Icon variant
  if (variant === "icon") {
    return (
      <button
        onClick={handleAddToCart}
        disabled={isUpdating}
        className={`p-2 rounded-full transition-all ${
          justAdded
            ? "bg-green-500 text-white"
            : productInCart
            ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        aria-label="Add to cart"
      >
        {isUpdating ? (
          <FiLoader className="w-5 h-5 animate-spin" />
        ) : justAdded ? (
          <FiCheck className="w-5 h-5" />
        ) : (
          <FiShoppingCart className="w-5 h-5" />
        )}
      </button>
    );
  }

  // Text variant
  if (variant === "text") {
    return (
      <button
        onClick={handleAddToCart}
        disabled={isUpdating}
        className={`text-sm font-medium underline transition-colors ${
          justAdded ? "text-green-600" : "text-purple-600 hover:text-purple-700"
        } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isUpdating ? "Adding..." : justAdded ? "Added!" : "Add to Cart"}
      </button>
    );
  }

  // Default variant
  return (
    <div className="space-y-2">
      <button
        onClick={handleAddToCart}
        disabled={isUpdating}
        className={`w-full items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
          justAdded
            ? "bg-green-500 text-white"
            : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
        } disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
      >
        <p className="flex items-center justify-center gap-2">
          {isUpdating ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              Adding...
            </>
          ) : justAdded ? (
            <>
              <FiCheck className="w-5 h-5" />
              Added to Cart!
            </>
          ) : (
            <>
              <FiShoppingCart className="w-5 h-5" />
              {productInCart ? `Add More` : "Add to Cart"}
            </>
          )}
        </p>
        {productInCart && (
          <p className="text-xs">({currentQuantity} in cart)</p>
        )}
      </button>

      {showQuantity && productInCart && (
        <p className="text-sm text-gray-600 text-center">
          {currentQuantity} {currentQuantity === 1 ? "item" : "items"} in cart
        </p>
      )}
    </div>
  );
});

export default AddToCartButton;
