import agent from '@/lib/api/agent';
import type { UserDto, Role } from '@/features/users/types/user';

export const userApi = {
  getUsers: async (): Promise<UserDto[]> => {
    const response = await agent.get<UserDto[]>('/Admin');
    return response.data;
  },

  addRole: async ({ userId, roleName }: { userId: string; roleName: Role }): Promise<void> => {
    await agent.post(`/Admin/${userId}/roles${roleName}`);
  },

  removeRole: async ({ userId, roleName }: { userId: string; roleName: Role }): Promise<void> => {
    await agent.delete(`/Admin/${userId}/roles/${roleName}`);
  },

  disableUser: async (userId: string): Promise<void> => {
    await agent.post(`/Admin/${userId}/disable`);
  },

  enableUser: async (userId: string): Promise<void> => {
    await agent.post(`/Admin/${userId}/enable`);
  },
};
