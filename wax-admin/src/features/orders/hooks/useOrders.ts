import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { orderApi } from '@/features/orders/api/orderApi';
import { queryKeys } from '@/lib/queryKeys';

type UseOrdersOptions = {
  pageSize?: number;
  filter?: string;
};

export const useOrders = ({ pageSize = 10, filter }: UseOrdersOptions = {}) => {
  return useInfiniteQuery({
    queryKey: queryKeys.orders.list({ pageSize, filter }),
    queryFn: ({ pageParam }) =>
      orderApi.getOrders({
        cursor: pageParam ?? undefined,
        pageSize,
        filter: filter || 'Pending',
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => orderApi.getOrder(id),
    enabled: !!id,
  });
};
