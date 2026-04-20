import type { ProductParams } from '@/features/catalog/types/product';

export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...queryKeys.auth.all, 'current-user'] as const,
  },
  products: {
    all: ['products'] as const,
    list: (params: ProductParams) => [...queryKeys.products.all, 'list', params] as const,
    detail: (id: string) => [...queryKeys.products.all, 'detail', id] as const,
  },
} as const;

export const mutationKeys = {
  auth: {
    login: ['auth', 'login'] as const,
    logout: ['auth', 'logout'] as const,
  },
  products: {
    create: ['products', 'create'] as const,
    update: ['products', 'update'] as const,
    delete: ['products', 'delete'] as const,
  },
} as const;