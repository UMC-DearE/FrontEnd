import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/api/http";
import type { UpdateMeRequest, UpdateMeResponse } from "@/types/user";
import { meQueryKey } from "@/hooks/queries/userKeys";
import { homeQueryKey } from "../queries/homeKeys";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation<UpdateMeResponse, unknown, UpdateMeRequest>({
    mutationFn: async (payload: UpdateMeRequest) => {
      const res = await updateMe(payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meQueryKey });
      queryClient.invalidateQueries({ queryKey: homeQueryKey });
    },
  });
}
