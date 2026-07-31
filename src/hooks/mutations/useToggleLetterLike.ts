import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeLetter, unlikeLetter } from '@/api/letter';
import type { LetterDetailResponse } from '@/types/letter';

export function useToggleLetterLike(letterId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (nextLiked: boolean) => (nextLiked ? likeLetter(letterId) : unlikeLetter(letterId)),

    onMutate: async (nextLiked) => {
      await qc.cancelQueries({ queryKey: ['letter', letterId] });

      const prev = qc.getQueryData<LetterDetailResponse>(['letter', letterId]);

      qc.setQueryData(['letter', letterId], (old?: LetterDetailResponse) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            isLiked: nextLiked,
          },
        };
      });

      return { prev };
    },

    onError: (_err, _nextLiked, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(['letter', letterId], ctx.prev);
      }
    },
  });
}
