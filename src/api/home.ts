import { api } from '@/api/http';
import type { HomeResponse, HomeDataApi } from '@/types/home';

export async function getHome(): Promise<HomeDataApi> {
  const res = await api.get<HomeResponse>('/home');
  return res.data.data;
}
