import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLetterPinned } from '@/api/letter';
import { randomLetterKey, type RandomLetterResponse } from '@/hooks/queries/useRandomLetterQuery';

export function usePinLetter() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (letterId: number) => {
      await updateLetterPinned(letterId, true);
      return letterId;
    },
    onSuccess: (letterId) => {
      qc.setQueryData(randomLetterKey, (prev: RandomLetterResponse | undefined) => {
        if (!prev) return prev;
        if (!prev.hasLetter) return prev;
        if (prev.letterId !== letterId) return prev;
        return { ...prev, isPinned: true };
      });
    },
  });
}
