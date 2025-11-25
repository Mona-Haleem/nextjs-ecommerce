import { useMemo } from "react";
import { CartItemData } from "@/lib/types";
import { useCartData } from "./useCartData";

export function useCartSelectors(userId: string | undefined) {
  const { data: cart } = useCartData(userId);
  const items = useMemo(()=>cart?.items || [],[cart]);

  const isInCart = useMemo(
    () => (productId: number) =>
      items.some((item: CartItemData) => item.id === productId),
    [items]
  );

  const getItemQuantity = useMemo(
    () => (productId: number) => {
      const item = items.find((item: CartItemData) => item.id === productId);
      return item?.stock || 0;
    },
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (sum: number, item: CartItemData) => sum + item.price * item.stock,
        0
      ),
    [items]
  );

  const totalItems = useMemo(
    () =>
      items.reduce((sum: number, item: CartItemData) => sum + item.stock, 0),
    [items]
  );

  return {
    items,
    isInCart,
    getItemQuantity,
    totalPrice,
    totalItems,
  };
}
