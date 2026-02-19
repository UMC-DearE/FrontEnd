import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSticker } from '@/api/sticker';
import {
  cancelHome,
  getHomeSnapshot,
  setHomeSnapshot,
  removeSticker,
} from '@/hooks/mutations/homeCache';

type DeleteStickerVars = {
  stickerId: number;
};

type Ctx = {
  snapshot: ReturnType<typeof getHomeSnapshot>;
};

export function useDeleteSticker() {
  const queryClient = useQueryClient();

  return useMutation<{ stickerId: number }, Error, DeleteStickerVars, Ctx>({
    mutationFn: ({ stickerId }) => deleteSticker(stickerId),
    onMutate: async ({ stickerId }) => {
      await cancelHome(queryClient);

      const snapshot = getHomeSnapshot(queryClient);
      removeSticker(queryClient, stickerId);

      return { snapshot };
    },
    onError: (_err, _vars, ctx) => {
      setHomeSnapshot(queryClient, ctx?.snapshot);
    },
  });
}
