import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reanalyzeReport } from '@/api/report';
import { REPORT_QUERY_KEY } from '@/hooks/queries/useReport';

export function useReanalyzeReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reanalyzeReport,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: REPORT_QUERY_KEY,
      });
    },
  });
}
