import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLetter } from "@/api/letter";

export function useDeleteLetter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (letterId: number) => deleteLetter(letterId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
  });
}
