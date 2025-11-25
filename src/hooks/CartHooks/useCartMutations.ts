import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItemData } from "@/lib/types";
import { updateCartInStorage, clearUserCart } from "@/lib/api/cart";

export function useCartMutations(userId: string | undefined) {
  const queryClient = useQueryClient();

  const updateCart = useMutation({
    mutationFn: (newCart: CartItemData[]) =>
      updateCartInStorage(userId!, newCart),
    onMutate: async (newCart) => {
      await queryClient.cancelQueries({ queryKey: ["cart", userId] });
      const previousCart = queryClient.getQueryData(["cart", userId]);
      queryClient.setQueryData(["cart", userId], { items: newCart });
      return { previousCart };
    },
    onError: (error, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", userId], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });

  const clearCart = useMutation({
    mutationFn: () => clearUserCart(userId!),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart", userId] });
      const previousCart = queryClient.getQueryData(["cart", userId]);
      queryClient.setQueryData(["cart", userId], { items: [] });
      return { previousCart };
    },
    onError: (error, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", userId], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });

  return {
    updateCart,
    clearCart,
    isUpdating: updateCart.isPending || clearCart.isPending,
  };
}
