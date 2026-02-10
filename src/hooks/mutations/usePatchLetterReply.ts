import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLetterReply } from "@/api/letter";

export function usePatchLetterReply(letterId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (reply: string) =>
      patchLetterReply(letterId, { reply }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["letter", letterId] });
    },
  });
}
