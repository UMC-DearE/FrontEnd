import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLetter } from "@/api/letter";
import type { PatchLetterRequest } from "@/types/letter";

type Vars = {
  letterId: number;
  payload: PatchLetterRequest;
};

export function usePatchLetter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ letterId, payload }: Vars) =>
      patchLetter(letterId, payload),

    onSuccess: (_res, { letterId }) => {
      queryClient.invalidateQueries({ queryKey: ["letter", letterId] });
      
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });
}
