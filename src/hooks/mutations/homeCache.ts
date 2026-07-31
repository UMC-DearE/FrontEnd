import type { QueryClient } from '@tanstack/react-query';
import { homeQueryKey } from '@/hooks/queries/homeKeys';
import type { HomeDataDto } from '@/api/home';

export type HomeSnapshot = HomeDataDto | undefined;

export async function cancelHome(queryClient: QueryClient) {
  await queryClient.cancelQueries({ queryKey: homeQueryKey });
}

export function getHomeSnapshot(queryClient: QueryClient): HomeSnapshot {
  return queryClient.getQueryData<HomeDataDto>(homeQueryKey);
}

export function setHomeSnapshot(queryClient: QueryClient, snapshot: HomeSnapshot) {
  queryClient.setQueryData(homeQueryKey, snapshot);
}

export async function invalidateHome(queryClient: QueryClient) {
  await queryClient.invalidateQueries({ queryKey: homeQueryKey });
}
