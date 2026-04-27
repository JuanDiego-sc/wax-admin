import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { supportApi } from '@/features/support/api/supportApi';
import { queryKeys } from '@/lib/queryKeys';
import type { TicketParams } from '@/features/support/types/support';

export const useTickets = (params: TicketParams) => {
  return useQuery({
    queryKey: queryKeys.support.list(params),
    queryFn: () => supportApi.getTickets(params),
    placeholderData: keepPreviousData,
  });
};

export const useTicket = (id: string) => {
  return useQuery({
    queryKey: queryKeys.support.detail(id),
    queryFn: () => supportApi.getTicket(id),
    enabled: !!id,
  });
};
