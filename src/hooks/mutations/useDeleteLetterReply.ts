import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLetterReply } from "@/api/letter";

export function useDeleteLetterReply(letterId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLetterReply(letterId),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["letter", letterId] });
    },
  });
}
