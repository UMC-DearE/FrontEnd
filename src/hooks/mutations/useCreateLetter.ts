import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLetter } from '@/api/create';
import { REPORT_QUERY_KEY } from '../queries/useReport';

export function useCreateLetter() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createLetter,
    onSuccess: (res) => {
      if (res.success) {
        qc.invalidateQueries({ queryKey: ['letters'] });
        qc.invalidateQueries({ queryKey: ['froms'] });
        qc.invalidateQueries({
          queryKey: REPORT_QUERY_KEY,
        });
      }
    },
  });
}
