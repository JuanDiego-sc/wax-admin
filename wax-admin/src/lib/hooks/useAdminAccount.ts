import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import agent from '@/lib/api/agent';
import { mutationKeys, queryKeys } from '@/lib/queryKeys';
import type { AdminLoginCredentials, AdminUser } from '@/lib/types/auth';
import { routePaths } from '@/routes/routePaths';

export const useCurrentAdmin = () => {
  return useQuery({
    queryKey: queryKeys.auth.currentUser(),
    queryFn: async () => {
      const response = await agent.get<AdminUser>('/account/user-info');
      if (response.status === 204 || !response.data) {
        return null;
      }

      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAdminLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.auth.login,
    mutationFn: async (credentials: AdminLoginCredentials) => {
      await agent.post('/login?useCookies=true', credentials);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAdminLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.auth.logout,
    mutationFn: async () => {
      await agent.post('/account/logout');
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.auth.all });
      navigate(routePaths.login, { replace: true });
    },
  });
};