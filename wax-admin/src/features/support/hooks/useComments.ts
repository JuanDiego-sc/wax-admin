import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import type { CommentDto } from '@/features/support/types/support';

/**
 * Reads the comments for a ticket from the React Query cache.
 *
 * This query has NO `queryFn` — it never fetches on its own.
 * The data is populated entirely by SignalR events in `useSupportChat`,
 * which writes to the same cache key via `queryClient.setQueryData`.
 *
 * Components that call `useComments(ticketId)` automatically re-render
 * whenever the cache entry changes, giving us reactive UI updates
 * without prop drilling or local state.
 */
export const useComments = (ticketId: string) => {
  return useQuery<CommentDto[]>({
    queryKey: queryKeys.support.comments(ticketId),
    queryFn: () => [],
    enabled: false,
    initialData: [],
  });
};
