"use client";

import { CartItemData } from "@/lib/types";
import {
  getCartItems,
  updateCartInStorage,
} from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useCart = () => {
  const { data: session } = useSession(); // get session
  const userId = session?.user?.id;

  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cartItems", userId],
    queryFn: () => getCartItems(userId),
    enabled: !!userId, // don't run query until we have userId
    staleTime: 1000 * 60 * 5,
  });

  const updateCart = useMutation({
    mutationFn: (updatedCart: CartItemData[]) =>
      updateCartInStorage(userId, updatedCart),
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems", userId]);
    },
  });

  return { cartItems, isLoading, isError, updateCart };
};
