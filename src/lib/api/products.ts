import axios from "axios";
import { Data_URL } from ".";
import { Product } from "../types";

export const fetchProducts = async ():Promise<{products:Product[]}> => {
  const response = await axios.get(`${Data_URL}/products`);
  return response.data;
};

export const fetchProductsByCategory = async (category: string):Promise<{products:Product[]}> => {
  const response = await axios.get(`${Data_URL}/products/category/${category}`);
  return response.data;
};

export const fetchProductById = async (id: number):Promise<Product> => {
  const response = await axios.get(`${Data_URL}/products/${id}`);
  // console.log(response.data)
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${Data_URL}/products/category-list`);
 // console.log(response.data)
  return response.data;
};
