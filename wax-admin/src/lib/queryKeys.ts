export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...queryKeys.auth.all, 'current-user'] as const,
  },
} as const;

export const mutationKeys = {
  auth: {
    login: ['auth', 'login'] as const,
    logout: ['auth', 'logout'] as const,
  },
} as const;