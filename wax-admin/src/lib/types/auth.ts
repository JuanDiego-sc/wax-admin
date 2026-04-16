export type AdminUser = {
  email: string;
  userName: string;
  roles: string[];
};

export type AdminLoginCredentials = {
  email: string;
  password: string;
};