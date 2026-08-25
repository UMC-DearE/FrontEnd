import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchLetter } from '@/api/letter';
import type { PatchLetterRequest } from '@/types/letter';
import { REPORT_QUERY_KEY } from '@/hooks/queries/useReport';

type Vars = {
  letterId: number;
  payload: PatchLetterRequest;
};

export function usePatchLetter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ letterId, payload }: Vars) => patchLetter(letterId, payload),

    onSuccess: async (_res, { letterId }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['letter', letterId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['letters'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['froms'],
        }),
        queryClient.invalidateQueries({
          queryKey: REPORT_QUERY_KEY,
        }),
      ]);
    },
  });
}
