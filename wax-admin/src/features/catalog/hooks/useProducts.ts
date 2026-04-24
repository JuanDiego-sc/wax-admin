import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { productApi } from '@/features/catalog/api/productApi';
import { queryClient } from '@/services/queryClient';
import { queryKeys } from '@/lib/queryKeys';
import type { ProductListResponse, ProductParams } from '@/features/catalog/types/product';

export const useProducts = (params: ProductParams) => {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productApi.getProducts(params),
    placeholderData: keepPreviousData,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productApi.getProduct(id),
    enabled: !!id,
    initialData: () => {
      const cachedLists = queryClient.getQueriesData<ProductListResponse>({
        queryKey: queryKeys.products.all,
      });
      for (const [, data] of cachedLists) {
        const found = data?.items?.find((p) => p.id === id);
        if (found) return found;
      }
    },
    initialDataUpdatedAt: () => {
      const state = queryClient.getQueryState(queryKeys.products.all);
      return state?.dataUpdatedAt;
    },
  });
};
