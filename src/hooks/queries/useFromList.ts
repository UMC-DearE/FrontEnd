// 프롬 목록 불러오기

import { useQuery } from '@tanstack/react-query';
import { getFromList } from '@/api/from';
import type { From } from '@/types/from';

export function useFromList() {
  return useQuery<From[]>({
    queryKey: ['froms'],
    queryFn: getFromList,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
