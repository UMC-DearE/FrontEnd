import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeLetter, unlikeLetter } from "@/api/letter";

export function useToggleLetterLike(letterId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (nextLiked: boolean) =>
      nextLiked ? likeLetter(letterId) : unlikeLetter(letterId),

    // optimistic update
    onMutate: async (nextLiked) => {
      await qc.cancelQueries({ queryKey: ["letter", letterId] });

      const prev = qc.getQueryData<any>(["letter", letterId]);

      qc.setQueryData(["letter", letterId], (old: any) => {
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
        qc.setQueryData(["letter", letterId], ctx.prev);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["letter", letterId] });
    },
  });
}
