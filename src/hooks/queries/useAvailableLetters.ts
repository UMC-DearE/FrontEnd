// 폴더에 추가 가능한 편지 목록 불러오기

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAvailableLetters } from '@/api/folder';
import type { AvailableLettersParams } from '@/types/folder';
import { folderKeys } from './folderKeys';

export function useAvailableLetters(folderId: number | undefined, params: AvailableLettersParams) {
  return useQuery({
    queryKey: folderKeys.available(folderId ?? -1, params),
    queryFn: () => getAvailableLetters(folderId as number, params),
    enabled: folderId != null,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
