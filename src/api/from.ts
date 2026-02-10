import type { GetFromsResponse } from '@/types/from';

export async function getFroms(): Promise<GetFromsResponse> {
  const res = await fetch('/froms', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`GET /froms failed: ${res.status}`);
  }

  return (await res.json()) as GetFromsResponse;
}
