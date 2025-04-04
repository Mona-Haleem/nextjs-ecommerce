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

export const getCartItems = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const updateCartInStorage = (newCart: CartItemData[]) => {
  localStorage.setItem("cart", JSON.stringify(newCart));
};

export async function fetchUserData(userId: string) {
  const res = await fetch(`http://localhost:3001/users/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
}