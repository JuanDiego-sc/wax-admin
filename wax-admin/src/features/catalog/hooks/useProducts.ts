import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/features/catalog/api/productApi';
import { queryKeys } from '@/lib/queryKeys';
import type { ProductParams } from '@/features/catalog/types/product';

export const useProducts = (params: ProductParams) => {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productApi.getProducts(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productApi.getProduct(id),
    enabled: !!id,
  });
};
