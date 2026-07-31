import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateHome,
  type HomeDataDto,
  type HomeStickerDto,
  type UpdateHomeRequest,
} from '@/api/home';
import {
  cancelHome,
  getHomeSnapshot,
  setHomeSnapshot,
  invalidateHome,
} from '@/hooks/mutations/homeCache';
import { homeQueryKey } from '@/hooks/queries/homeKeys';

type UpdateHomeVars = {
  request: UpdateHomeRequest;
  // 서버가 stickerId를 새로 발급하므로 낙관적 반영에만 쓰는 임시 목록
  optimisticStickers: HomeStickerDto[];
};

type Ctx = {
  snapshot: ReturnType<typeof getHomeSnapshot>;
};

export function useUpdateHome() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateHomeVars, Ctx>({
    mutationFn: ({ request }) => updateHome(request),
    onMutate: async ({ request, optimisticStickers }) => {
      await cancelHome(queryClient);

      const snapshot = getHomeSnapshot(queryClient);

      queryClient.setQueryData<HomeDataDto>(homeQueryKey, (prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          setting: { ...prev.setting, homeColor: request.homeColor },
          stickers: optimisticStickers,
        };
      });

      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      setHomeSnapshot(queryClient, ctx?.snapshot);
    },
    // 서버가 발급한 stickerId를 받아오기 위해 성공/실패 후 항상 재조회
    onSettled: () => invalidateHome(queryClient),
  });
}
