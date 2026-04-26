import agent from '@/lib/api/agent';
import type { OrderDto, OrderListResponse, OrderParams } from '@/features/orders/types/order';

type ResultWrapper<T> = { value: T; isSuccess: boolean };

export const orderApi = {
  getOrders: async (params: OrderParams): Promise<OrderListResponse> => {
    const response = await agent.get<OrderListResponse | ResultWrapper<OrderListResponse>>(
      '/Order',
      { params },
    );
    const data = response.data;
    if ('value' in data && 'isSuccess' in data) {
      return data.value;
    }
    return data;
  },

  getOrder: async (id: string): Promise<OrderDto> => {
    const response = await agent.get<OrderDto | ResultWrapper<OrderDto>>(`/Order/${id}`);
    const data = response.data;
    if ('value' in data && 'isSuccess' in data) {
      return data.value;
    }
    return data;
  },
};
