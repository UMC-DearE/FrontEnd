import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFrom } from "@/api/from";

export function useCreateFrom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFrom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['froms'] });
    },
  });
}

