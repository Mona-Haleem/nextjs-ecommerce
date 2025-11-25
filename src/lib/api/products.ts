import axios from "axios";
import { Data_URL } from ".";
import { Product } from "../types";

interface FetchProductsParams {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export interface pagesResponse {
  pages: ProductsResponse[];
  pageParams: number[];
}
export const fetchProducts = async (
  params?: FetchProductsParams
): Promise<ProductsResponse> => {
  let url = `${Data_URL}/products`;
  const queryParams = new URLSearchParams();

  if (params) {
    // Pagination
    if (params.limit !== undefined)
      queryParams.append("limit", params.limit.toString());
    if (params.skip !== undefined)
      queryParams.append("skip", params.skip.toString());

    // Sorting
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.order) queryParams.append("order", params.order);

    // Search
    if (params.search) {
      url = `${Data_URL}/products/search`;
      queryParams.append("q", params.search);
    }
    // Category
    else if (params.category) {
      url = `${Data_URL}/products/category/${params.category}`;
    }
  }

  const queryString = queryParams.toString();
  const response = await axios.get(
    `${url}${queryString ? `?${queryString}` : ""}`
  );
  return response.data ;
};

export const fetchProductsByCategory = async (
  category: string
): Promise<{ products: Product[]; total: number }> => {
  const response = await axios.get(`${Data_URL}/products/category/${category}`);
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get(`${Data_URL}/products/${id}`);
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${Data_URL}/products/category-list`);
  return response.data;
};

export const searchProducts = async (
  query: string,
  limit?: number
): Promise<{ products: Product[]; total: number }> => {
  const params = new URLSearchParams({ q: query });
  if (limit) params.append("limit", limit.toString());

  const response = await axios.get(
    `${Data_URL}/products/search?${params.toString()}`
  );
  return response.data;
};
