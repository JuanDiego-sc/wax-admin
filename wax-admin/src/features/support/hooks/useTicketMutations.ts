import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { supportApi } from '@/features/support/api/supportApi';
import { mutationKeys, queryKeys } from '@/lib/queryKeys';
import { routePaths } from '@/routes/routePaths';
import type { TicketListResponse } from '@/features/support/types/support';

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: mutationKeys.support.create,
    mutationFn: supportApi.createTicket,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.support.all });
      toast.success('Ticket creado exitosamente');
      navigate(routePaths.support);
    },
    onError: () => {
      toast.error('Error al crear el ticket');
    },
  });
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.support.update,
    mutationFn: supportApi.updateTicket,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.support.all });
      toast.success('Ticket actualizado exitosamente');
    },
    onError: () => {
      toast.error('Error al actualizar el ticket');
    },
  });
};

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.support.delete,
    mutationFn: supportApi.deleteTicket,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.support.all });

      const previousLists = queryClient.getQueriesData<TicketListResponse>({
        queryKey: queryKeys.support.all,
      });

      queryClient.setQueriesData<TicketListResponse>(
        { queryKey: queryKeys.support.all },
        (old) => {
          if (!old?.items) return old;
          return {
            ...old,
            items: old.items.filter((t) => t.id !== id),
            totalCount: old.totalCount - 1,
          };
        },
      );

      return { previousLists };
    },
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.support.detail(id) });
      toast.success('Ticket eliminado exitosamente');
    },
    onError: (_error, _id, context) => {
      if (context?.previousLists) {
        for (const [queryKey, data] of context.previousLists) {
          queryClient.setQueryData(queryKey, data);
        }
      }
      toast.error('Error al eliminar el ticket');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.support.all });
    },
  });
};
