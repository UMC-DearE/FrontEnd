import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSticker, type StickerUpdateRequest } from '@/api/sticker';
import type { HomeStickerDto } from '@/api/home';
import {
  cancelHome,
  getHomeSnapshot,
  setHomeSnapshot,
  patchHomeStickers,
} from '@/hooks/mutations/homeCache';

type UpdateStickerVars = {
  stickerId: number;
  body: StickerUpdateRequest;
};

type Ctx = {
  snapshot: ReturnType<typeof getHomeSnapshot>;
};

export function useUpdateSticker() {
  const queryClient = useQueryClient();

  return useMutation<{ stickerId: number }, Error, UpdateStickerVars, Ctx>({
    mutationFn: ({ stickerId, body }) => updateSticker(stickerId, body),
    onMutate: async ({ stickerId, body }) => {
      await cancelHome(queryClient);

      const snapshot = getHomeSnapshot(queryClient);

      patchHomeStickers(queryClient, (prev) =>
        prev.map((s): HomeStickerDto => (s.stickerId === stickerId ? { ...s, ...body } : s))
      );

      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      setHomeSnapshot(queryClient, ctx?.snapshot);
    },
  });
}
