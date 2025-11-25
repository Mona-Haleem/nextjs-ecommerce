import { apiClient } from ".";
import { CartItemData } from "../types";

export const getCartItems = async (userId: string) => {
  const response = await apiClient.get(`/api/cart?userId=${userId}`);
  const carts = response.data;
  // console.log("Carts:", carts);
  if (!carts.length) return null;
  return carts[0];
};

export const updateCartInStorage = async (
  userId: string,
  newCart: CartItemData[]
) => {
  await apiClient.post("/api/cart", {
    userId,
    items: newCart,
  });
};

export const clearUserCart = async (userId: string) => {
  const response = await apiClient.get(`/api/cart?userId=${userId}`);
  const cart = response.data[0];

  if (cart) {
    await apiClient.delete(`/api/cart/${cart.id}?userId=${userId}`);
  }
};