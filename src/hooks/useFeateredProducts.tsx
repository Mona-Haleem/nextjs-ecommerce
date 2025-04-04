"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, 
  });
};
