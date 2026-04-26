import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { userApi } from '@/features/users/api/userApi';
import { mutationKeys, queryKeys } from '@/lib/queryKeys';

export const useAddRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.users.addRole,
    mutationFn: userApi.addRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success('Rol asignado exitosamente');
    },
    onError: () => {
      toast.error('Error al asignar el rol');
    },
  });
};

export const useRemoveRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.users.removeRole,
    mutationFn: userApi.removeRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success('Rol removido exitosamente');
    },
    onError: () => {
      toast.error('Error al remover el rol');
    },
  });
};

export const useDisableUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.users.disable,
    mutationFn: userApi.disableUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success('Usuario deshabilitado');
    },
    onError: () => {
      toast.error('Error al deshabilitar el usuario');
    },
  });
};

export const useEnableUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.users.enable,
    mutationFn: userApi.enableUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success('Usuario habilitado');
    },
    onError: () => {
      toast.error('Error al habilitar el usuario');
    },
  });
};
