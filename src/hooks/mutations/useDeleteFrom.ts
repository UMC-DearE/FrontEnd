import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFrom } from "@/api/from";
import type { From } from "@/types/from";

export function useDeleteFrom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fromId: number) => {
      const res = await deleteFrom(fromId);
      if (!res.success) {
        throw new Error(res.message || "프롬 삭제에 실패했어요.");
      }
      return { res, fromId };
    },
    onSuccess: ({ res, fromId }) => {
      if (!res.success) return;
      queryClient.setQueryData<From[]>(["froms"], (prev = []) =>
        prev.filter((f) => f.fromId !== fromId)
      );
    },
  });
}
