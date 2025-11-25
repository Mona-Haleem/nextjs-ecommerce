import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const useProductFilters = () => {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const params = useParams();
  const categoryFromQuery = searchParams.get("category");
  const categoryFromPath = params.category as string | undefined;

  const initialCategory = categoryFromPath || categoryFromQuery || "";

  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'default');

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortBy !== 'default') params.set('sortBy', sortBy);
    
    const queryString = params.toString();
    router.push(`/products${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [search, selectedCategory, sortBy, router]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      updateURL();
    }, 500);
    return () => clearTimeout(debounce);
  }, [updateURL]);

  const clearFilters = (): void => {
    setSearch('');
    setSelectedCategory('');
    setSortBy('default');
  };

  const hasActiveFilters: boolean = Boolean(search || selectedCategory || sortBy !== 'default');

  return {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    clearFilters,
    hasActiveFilters,
  };
};
