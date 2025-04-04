"use client";

import { CartItemData } from "@/lib/types";
import { getCartItems, updateCartInStorage } from "@/lib/api";
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cartItems, isLoading, isError } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    staleTime: 1000 * 60 * 5,
  }); 

  const updateCart = useMutation({
    mutationFn: (updatedCart: CartItemData[]) => {
      updateCartInStorage(updatedCart);
      queryClient.setQueryData(["cartItems"], updatedCart);
      return Promise.resolve();

    },
  });

  return { cartItems, isLoading, isError, updateCart };
};
