import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/features/users/api/userApi';
import { queryKeys } from '@/lib/queryKeys';

export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: userApi.getUsers,
  });
};
