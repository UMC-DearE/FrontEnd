import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFrom } from "@/api/from";
import type { UpdateFromRequest, From } from "@/types/from";

export function useUpdateFrom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fromId, payload }: { fromId: number; payload: UpdateFromRequest }) => {
      const res = await updateFrom(fromId, payload);
      if (!res.success) {
        throw new Error(res.message || "프롬 수정에 실패했어요.");
      }
      return res;
    },
    onSuccess: (res, { fromId }) => {
      queryClient.setQueryData<From[]>(["froms"], (prev = []) =>
        prev.map((f) =>
          f.fromId === fromId
            ? {
                ...f,
                name: res.data.name,
                bgColor: res.data.bgColor,
                fontColor: res.data.fontColor,
              }
            : f
        )
      );
    },
  });
}
