// 편지 목록 불러오기

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getLetterLists, type GetLetterListsParams } from '@/api/letter';

export const letterKeys = {
  list: (params: GetLetterListsParams) => ['letters', params] as const,
};

export function useLetterLists(params: GetLetterListsParams) {
  return useQuery({
    queryKey: letterKeys.list(params),
    queryFn: () => getLetterLists(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
