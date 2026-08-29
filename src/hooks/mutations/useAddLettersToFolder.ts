// 폴더에 편지 다중 추가/이동

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLettersToFolder } from '@/api/folder';
import { folderKeys } from '@/hooks/queries/folderKeys';

export function useAddLettersToFolder(folderId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (letterIds: number[]) => addLettersToFolder(folderId as number, letterIds),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: folderKeys.all }),
        queryClient.invalidateQueries({ queryKey: ['letters'] }),
      ]);
    },
  });
}
