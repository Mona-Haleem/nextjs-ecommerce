import { useCallback } from "react";
import { Product, CartItemData } from "@/lib/types";
import { useCartData } from "./useCartData";
import { useCartMutations } from "./useCartMutations";

interface UseCartActionsOptions {
  onSuccess?: (action: string) => void;
  onError?: (error: Error) => void;
}

export function useCartActions(
  userId: string | undefined,
  options?: UseCartActionsOptions
) {
  const { data: cart } = useCartData(userId);
  const { updateCart, isUpdating } = useCartMutations(userId);

  const addToCart = useCallback(
    async (product: Product, quantity: number = 1) => {
      if (!userId) {
        throw new Error("User must be logged in");
      }

      const currentItems = cart?.items || [];
      const existingItem = currentItems?.find(
        (item: CartItemData) => item.id === product.id
      );

      let newItems: CartItemData[];

      if (existingItem) {
        newItems = currentItems.map((item: CartItemData) =>
          item.id === product.id
            ? { ...item, stock: item.stock + quantity }
            : item
        );
      } else {
        newItems = [
          ...currentItems,
          {
           ...product,
            stock: quantity,
          },
        ];
      }

      try {
        await updateCart.mutateAsync(newItems);
        options?.onSuccess?.("add");
      } catch (error) {
        options?.onError?.(error as Error);
        throw error;
      }
    },
    [userId, cart?.items, updateCart, options]
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      if (!userId) return;

      const currentItems = cart?.items || [];
      const newItems = currentItems.filter(
        (item: CartItemData) => item.id !== productId
      );

      try {
        await updateCart.mutateAsync(newItems);
        options?.onSuccess?.("remove");
      } catch (error) {
        options?.onError?.(error as Error);
        throw error;
      }
    },
    [userId, cart?.items, updateCart, options]
  );

  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      if (!userId) return;

      if (quantity <= 0) {
        return removeFromCart(productId);
      }

      const currentItems = cart?.items || [];
      const newItems = currentItems.map((item: CartItemData) =>
        item.id === productId ? { ...item, stock: quantity } : item
      );

      try {
        await updateCart.mutateAsync(newItems);
        options?.onSuccess?.("update");
      } catch (error) {
        options?.onError?.(error as Error);
        throw error;
      }
    },
    [userId, cart?.items, updateCart, removeFromCart, options]
  );

  return {
    addToCart,
    removeFromCart,
    updateQuantity,
    isUpdating,
  };
}
