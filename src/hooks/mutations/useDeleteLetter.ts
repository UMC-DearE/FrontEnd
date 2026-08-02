import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLetter } from '@/api/letter';
import { randomLetterKey } from '@/hooks/queries/useRandomLetterQuery';

export function useDeleteLetter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (letterId: number) => deleteLetter(letterId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letters'] });
      // 추첨된 편지를 삭제 -> hasLetter: false로 바뀌므로 홈 카드도 갱신
      queryClient.invalidateQueries({ queryKey: randomLetterKey });
    },
  });
}
