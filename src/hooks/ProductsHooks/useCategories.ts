import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchCategories } from '@/lib/api/products';

export const useCategories = (): UseQueryResult<string[], Error> => {
  return useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60, 
  });
};
