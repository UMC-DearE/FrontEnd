import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLetter } from '@/api/letter';
import { randomLetterKey } from '@/hooks/queries/useRandomLetterQuery';
import { REPORT_QUERY_KEY } from '@/hooks/queries/useReport';

export function useDeleteLetter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (letterId: number) => deleteLetter(letterId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['letters'] }),
        queryClient.invalidateQueries({ queryKey: ['froms'] }),
        queryClient.invalidateQueries({ queryKey: randomLetterKey }),
        queryClient.invalidateQueries({ queryKey: REPORT_QUERY_KEY }),
      ]);
    },
  });
}
