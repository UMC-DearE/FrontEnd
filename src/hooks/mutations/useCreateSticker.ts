import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSticker, type StickerCreateRequest } from '@/api/sticker';
import type { HomeStickerDto } from '@/api/home';
import {
  cancelHome,
  getHomeSnapshot,
  setHomeSnapshot,
  patchHomeStickers,
} from '@/hooks/mutations/homeCache';

type CreateStickerVars = {
  request: StickerCreateRequest;
  imageUrl: string;
  clientStickerId?: number;
};

type Ctx = {
  snapshot: ReturnType<typeof getHomeSnapshot>;
  tempStickerId: number;
};

export function useCreateSticker() {
  const queryClient = useQueryClient();

  return useMutation<{ stickerId: number }, Error, CreateStickerVars, Ctx>({
    mutationFn: ({ request }) => createSticker(request),
    onMutate: async ({ request, imageUrl, clientStickerId }) => {
      await cancelHome(queryClient);

      const snapshot = getHomeSnapshot(queryClient);
      const tempStickerId = clientStickerId ?? -Date.now();

      const optimistic: HomeStickerDto = {
        stickerId: tempStickerId,
        imageId: request.imageId,
        imageUrl,
        posX: request.posX,
        posY: request.posY,
        posZ: request.posZ,
        rotation: request.rotation,
        scale: request.scale,
      };

      patchHomeStickers(queryClient, (prev) => [...prev, optimistic]);

      return { snapshot, tempStickerId };
    },
    onError: (_err, _vars, ctx) => {
      setHomeSnapshot(queryClient, ctx?.snapshot);
    },
    onSuccess: (data, vars, ctx) => {
      if (!ctx) return;

      patchHomeStickers(queryClient, (prev) =>
        prev.map((s) =>
          s.stickerId === ctx.tempStickerId
            ? {
                ...s,
                stickerId: data.stickerId,
                imageId: vars.request.imageId,
              }
            : s
        )
      );
    },
  });
}
