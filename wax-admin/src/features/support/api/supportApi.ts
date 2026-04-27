import agent from '@/lib/api/agent';
import {
  TICKET_STATUS_VALUE,
  TICKET_CATEGORY_VALUE,
} from '@/features/support/types/support';
import type {
  CreateSupportTicketDto,
  SupportTicketDto,
  TicketListResponse,
  TicketParams,
  UpdateSupportTicketDto,
} from '@/features/support/types/support';

export const supportApi = {
  getTickets: async (params: TicketParams): Promise<TicketListResponse> => {
    const response = await agent.get<SupportTicketDto[]>('/Support', { params });
    const raw = response.headers['pagination'];
    const pagination = raw
      ? (JSON.parse(raw) as { CurrentPage: number; TotalPages: number; TotalCount: number })
      : { CurrentPage: 1, TotalPages: 1, TotalCount: 0 };
    return {
      items: response.data,
      pageNumber: pagination.CurrentPage,
      totalPages: pagination.TotalPages,
      totalCount: pagination.TotalCount,
    };
  },

  getTicket: async (id: string): Promise<SupportTicketDto> => {
    const response = await agent.get<SupportTicketDto>(`/Support/${id}`);
    return response.data;
  },

  createTicket: async (data: CreateSupportTicketDto): Promise<string> => {
    const response = await agent.post<string>('/Support', {
      ...data,
      status: TICKET_STATUS_VALUE[data.status],
      category: TICKET_CATEGORY_VALUE[data.category],
    });
    return response.data;
  },

  updateTicket: async ({ id, ...data }: UpdateSupportTicketDto & { id: string }): Promise<void> => {
    await agent.put(`/Support/${id}`, {
      ...data,
      status: TICKET_STATUS_VALUE[data.status],
      category: TICKET_CATEGORY_VALUE[data.category],
    });
  },

  deleteTicket: async (id: string): Promise<void> => {
    await agent.delete(`/Support/${id}`);
  },
};
