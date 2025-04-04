import axios from "axios";
import { CartItemData } from "./types";

const BASE_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const fetchProductsByCategory = async (category: string) => {
  const response = await axios.get(`${BASE_URL}/products/category/${category}`);
  return response.data;
};

export const fetchProductById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/products/category`);
  return response.data;
};

export const getCartItems = async (userId: string) => {
  const response = await axios.get(`http://localhost:3001/cart?userId=${userId}`);
  const carts = response.data;
  console.log("Carts:-----------------------------", carts);
  if (!carts.length) return null;
  return carts[0];
};

export const updateCartInStorage = async (userId: string, newCart: CartItemData[]) => {
  const response = await axios.get(`http://localhost:3001/cart?userId=${userId}`);
  const cart = response.data[0];

  if (!cart) throw new Error("Cart not found");

  await axios.put(`http://localhost:3001/cart/${cart.id}`, {
    ...cart,
    items: newCart,
  });
};

export async function fetchUserData(userId: string) {
  const res = await fetch(`http://localhost:3001/users/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
}