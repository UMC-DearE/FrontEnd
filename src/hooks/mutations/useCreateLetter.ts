import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLetter } from "@/api/create";

export function useCreateLetter() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createLetter,
    onSuccess: (res) => {
      if (res.success) {
        qc.invalidateQueries({ queryKey: ["letters"] });
      }
    },
  });
}
