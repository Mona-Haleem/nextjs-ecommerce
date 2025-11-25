"use client";

import { fetchProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, 
  });
};
