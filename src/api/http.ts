import axios from 'axios';

let accessToken = '';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { accept: '*/*' },
});

export const setAccessToken = (token: string) => {
  accessToken = token.startsWith('Bearer ') ? token.slice(7) : token;
};

export const refreshAccessToken = async () => {
  const res = await api.post('/auth/jwt/refresh');
  const headerToken = res.headers['authorization'];
  const bodyToken = res.data?.data?.accessToken ?? res.data?.accessToken ?? res.data?.token;
  const raw = headerToken ?? bodyToken;
  if (!raw) throw new Error('No access token from refresh');
  setAccessToken(raw);
  return accessToken;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
