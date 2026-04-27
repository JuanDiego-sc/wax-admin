import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { productApi } from '@/features/catalog/api/productApi';
import type { ProductListResponse } from '@/features/catalog/types/product';
import { mutationKeys, queryKeys } from '@/lib/queryKeys';
import { routePaths } from '@/routes/routePaths';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: mutationKeys.products.create,
    mutationFn: productApi.createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      toast.success('Producto creado exitosamente');
      navigate(routePaths.catalog);
    },
    onError: () => {
      toast.error('Error al crear el producto');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: mutationKeys.products.update,
    mutationFn: productApi.updateProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      toast.success('Producto actualizado exitosamente');
      navigate(routePaths.catalog);
    },
    onError: () => {
      toast.error('Error al actualizar el producto');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.products.delete,
    mutationFn: productApi.deleteProduct,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.products.all });

      const previousLists = queryClient.getQueriesData<ProductListResponse>({
        queryKey: queryKeys.products.all,
      });

      queryClient.setQueriesData<ProductListResponse>(
        { queryKey: queryKeys.products.all },
        (old) => {
          if (!old?.items) return old;
          return {
            ...old,
            items: old.items.filter((p) => p.id !== id),
            totalCount: old.totalCount - 1,
          };
        },
      );

      return { previousLists };
    },
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.products.detail(id) });
      toast.success('Producto eliminado exitosamente');
    },
    onError: (_error, _id, context) => {
      if (context?.previousLists) {
        for (const [queryKey, data] of context.previousLists) {
          queryClient.setQueryData(queryKey, data);
        }
      }
      toast.error('Error al eliminar el producto');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
};
