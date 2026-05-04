export const TICKET_STATUS = ['Open', 'InProgress', 'Closed'] as const;
export type TicketStatus = (typeof TICKET_STATUS)[number];

export const TICKET_STATUS_VALUE: Record<TicketStatus, number> = {
  Open: 0,
  InProgress: 1,
  Closed: 2,
};

export const TICKET_CATEGORY = ['OrderIssue', 'PaymentIssue', 'ProductIssue', 'Other'] as const;
export type TicketCategory = (typeof TICKET_CATEGORY)[number];

export const TICKET_CATEGORY_VALUE: Record<TicketCategory, number> = {
  OrderIssue: 0,
  PaymentIssue: 1,
  ProductIssue: 2,
  Other: 3,
};

export type SupportTicketDto = {
  id: string;
  subject: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  orderId: string;
  createdAt: string;
  userId: string;
  userFullName: string;
  userEmail: string;
};

export type CreateSupportTicketDto = {
  orderId: string;
  category: TicketCategory;
  status: TicketStatus;
  subject: string;
  description: string;
};

export type UpdateSupportTicketDto = {
  category: TicketCategory;
  status: TicketStatus;
  subject: string;
  description: string;
};

export type CommentDto = {
  id: string;
  body: string;
  createdAt: string;
  ticketId: string;
  userId: string;
  userName: string;
};

export type TicketListResponse = {
  items: SupportTicketDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
};

export type TicketParams = {
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;
  status?: string;
  category?: string;
  createdOn?: string;
};
