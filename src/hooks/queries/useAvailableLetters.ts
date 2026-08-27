// 폴더에 추가 가능한 편지 목록 불러오기

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAvailableLetters } from '@/api/folder';
import type { AvailableLettersParams } from '@/types/folder';
import { folderKeys } from './folderKeys';

export function useAvailableLetters(params: AvailableLettersParams) {
  return useQuery({
    queryKey: folderKeys.available(params),
    queryFn: () => getAvailableLetters(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
