import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMe } from "@/api/http";
import { meQueryKey } from "@/hooks/queries/userKeys";
import { homeQueryKey } from "../queries/homeKeys";

export function useDeleteMe() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, void>({
    mutationFn: async () => {
      await deleteMe();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: meQueryKey });
      queryClient.invalidateQueries({ queryKey: homeQueryKey });
    },
  });
}
