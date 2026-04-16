import axios from 'axios';
import { env } from '@/config/env';

const agent = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});

export default agent;