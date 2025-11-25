import { useCartActions, useCartData, useCartMutations, useCartSelectors } from "./CartHooks";

interface UseCartActionsOptions {
  onSuccess?: (action: string) => void;
  onError?: (error: Error) => void;
}

export function useCart(userId: string | undefined, options?: UseCartActionsOptions) {
  const { data: cart, isLoading, error } = useCartData(userId);
  const { clearCart, isUpdating } = useCartMutations(userId);
  const actions = useCartActions(userId, options);
  const selectors = useCartSelectors(userId);

  return {
    cart,
    ...selectors,
    ...actions,
    clearCart: clearCart.mutateAsync,
    isLoading,
    error,
    isUpdating: isUpdating || actions.isUpdating,
  };
}