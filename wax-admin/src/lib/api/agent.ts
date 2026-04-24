import axios from 'axios';
import { env } from '@/config/env';

const agent = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

const redirectToLogin = () => {
  if (globalThis.window === undefined) return;
  if (globalThis.window.location.pathname === '/login') return;
  globalThis.window.location.replace('/login');
};

agent.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) throw error;

    const status = error.response.status as number;
    const requestUrl = error.config?.url as string | undefined;
    const isLoginRequest = requestUrl?.includes('/login?useCookies=true');

    if (status === 401 && !isLoginRequest) {
      redirectToLogin();
    }

    throw error;
  }
);

export default agent;