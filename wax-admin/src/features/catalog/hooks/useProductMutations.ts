import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { productApi } from '@/features/catalog/api/productApi';
import { mutationKeys, queryKeys } from '@/lib/queryKeys';
import { routePaths } from '@/routes/routePaths';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: mutationKeys.products.create,
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
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
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(variables.id) });
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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      toast.success('Producto eliminado exitosamente');
    },
    onError: () => {
      toast.error('Error al eliminar el producto');
    },
  });
};
