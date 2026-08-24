import { useQuery } from '@tanstack/react-query';

import { getReport } from '@/api/report';

export const REPORT_QUERY_KEY = ['report'] as const;

export function useReport() {
  return useQuery({
    queryKey: REPORT_QUERY_KEY,
    queryFn: getReport,

    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
