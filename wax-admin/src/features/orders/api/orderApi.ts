import agent from '@/lib/api/agent';
import type { OrderDto, OrderListResponse, OrderParams } from '@/features/orders/types/order';

export const orderApi = {
  getOrders: async (params: OrderParams): Promise<OrderListResponse> => {
    const response = await agent.get<OrderDto[]>('/Order', { params });
    const raw = response.headers['pagination'];
    const pagination = raw
      ? (JSON.parse(raw) as { CurrentPage: number; TotalPages: number; TotalCount: number; PageSize: number })
      : { CurrentPage: 1, TotalPages: 1, TotalCount: 0, PageSize: params.pageSize ?? 10 };
    return {
      items: response.data,
      currentPage: pagination.CurrentPage,
      totalPages: pagination.TotalPages,
      totalCount: pagination.TotalCount,
      pageSize: pagination.PageSize,
    };
  },

  getOrder: async (id: string): Promise<OrderDto> => {
    const response = await agent.get<OrderDto>(`/Order/${id}`);
    return response.data;
  },
};
