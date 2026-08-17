import { useQuery } from '@tanstack/react-query';
import { reportMock } from '@/mocks/reportMock';

export const REPORT_QUERY_KEY = ['report'] as const;

export function useReport() {
  return useQuery({
    queryKey: REPORT_QUERY_KEY,

    queryFn: async () => reportMock,

    staleTime: 1000 * 60,
  });
}
