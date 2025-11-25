import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/lib/api/cart";

export function useCartData(userId: string | undefined) {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getCartItems(userId!),
    enabled: !!userId,
    staleTime: 30000, 
    gcTime: 300000,
    refetchOnWindowFocus: false,
    retry:2,
    retryDelay:1000
  });
}
