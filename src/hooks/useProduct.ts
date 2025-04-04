"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "@/lib/api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useProductDetails = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
};
