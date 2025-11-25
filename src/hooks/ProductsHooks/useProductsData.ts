import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { fetchProducts, pagesResponse } from '@/lib/api/products';
import { Product, ProductsResponse } from '@/lib/types';

const ITEMS_PER_PAGE = 20;

interface UseProductsDataProps {
  search: string;
  selectedCategory: string;
  sortBy: string;
}


interface UseProductsDataReturn {
  products: Product[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

// Helper to map sortBy values to API params
const getSortParams = (sortBy: string): { sortBy: string; order: 'asc' | 'desc' } | null => {
  const sortMap: Record<string, { sortBy: string; order: 'asc' | 'desc' }> = {
    'price-asc': { sortBy: 'price', order: 'asc' },
    'price-desc': { sortBy: 'price', order: 'desc' },
    'name-asc': { sortBy: 'title', order: 'asc' },
    'name-desc': { sortBy: 'title', order: 'desc' },
    'rating': { sortBy: 'rating', order: 'desc' },
  };
  
  return sortMap[sortBy] || null;
};

export const useProductsData = ({ search, selectedCategory, sortBy }: UseProductsDataProps): UseProductsDataReturn => {
  const sortParams = getSortParams(sortBy);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  }: UseInfiniteQueryResult<pagesResponse, Error> = useInfiniteQuery({
    queryKey: ['products', search, selectedCategory, sortBy],
    queryFn: async ({ pageParam = 0 }): Promise<ProductsResponse> => {
      const params = {
        limit: ITEMS_PER_PAGE,
        skip: pageParam as number,
        ...(search && { search }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(sortParams && sortParams),
      };
      return fetchProducts(params);
    },
    getNextPageParam: (lastPage: ProductsResponse, allPages: ProductsResponse[]): number | undefined => {
      const totalFetched = allPages.reduce((acc, page) => acc + page.products.length, 0);
      return totalFetched < lastPage.total ? totalFetched : undefined;
    },
    initialPageParam: 0,
  });

  const products: Product[] = data?.pages.flatMap(page => page.products) ?? [];
  const total: number = data?.pages[0]?.total ?? 0;




  return {
    products,
    total,
    isLoading,
    isError,
    error: error ?? null,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};