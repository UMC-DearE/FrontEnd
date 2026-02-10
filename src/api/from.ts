import type { FromListResponse } from '@/types/from';

export async function getFroms(): Promise<FromListResponse> {
  const res = await fetch('/froms', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  export const createFrom = async (payload: CreateFromRequest): Promise<CreateFromResponse> => {
    const { data } = await api.post<CreateFromResponse>('/froms', payload);
    return data;
  };

  return (await res.json()) as FromListResponse;
}
