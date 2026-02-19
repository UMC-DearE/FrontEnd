import type { QueryClient } from '@tanstack/react-query';
import { homeQueryKey } from '@/hooks/queries/homeKeys';
import type { HomeDataDto, HomeStickerDto } from '@/api/home';

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

export function patchHomeStickers(
  queryClient: QueryClient,
  updater: (prev: HomeStickerDto[]) => HomeStickerDto[]
) {
  queryClient.setQueryData<HomeDataDto>(homeQueryKey, (prev) => {
    if (!prev) return prev;
    return { ...prev, stickers: updater(prev.stickers ?? []) };
  });
}

export function replaceSticker(
  queryClient: QueryClient,
  fromStickerId: number,
  next: HomeStickerDto
) {
  patchHomeStickers(queryClient, (prev) =>
    prev.map((s) => (s.stickerId === fromStickerId ? next : s))
  );
}

export function removeSticker(queryClient: QueryClient, stickerId: number) {
  patchHomeStickers(queryClient, (prev) => prev.filter((s) => s.stickerId !== stickerId));
}
