export const ROLES = ['Admin', 'Enrolled', 'Registered'] as const;
export type Role = (typeof ROLES)[number];

export type UserDto = {
  id: string;
  email: string;
  userName: string;
  emailConfirmed: boolean;
  role: Role | null;
};
