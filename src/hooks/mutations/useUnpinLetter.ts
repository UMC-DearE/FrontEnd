import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLetterPinned } from '@/api/letter';
import { randomLetterKey, writeRandomLetterCache } from '@/hooks/queries/useRandomLetterQuery';
import { useMeQuery } from '@/hooks/queries/useMeQuery';
import type { RandomLetterData } from '@/types/letter';

export function useUnpinLetter() {
  const qc = useQueryClient();
  const { data: me } = useMeQuery();
  const userId = me?.userId;

  return useMutation({
    mutationFn: async (letterId: number) => {
      await updateLetterPinned(letterId, false);
      return letterId;
    },
    onSuccess: (letterId) => {
      if (typeof userId !== 'number') return;
      qc.setQueryData([...randomLetterKey, userId], (prev: RandomLetterData | undefined) => {
        if (!prev) return prev;
        if (!prev.hasLetter) return prev;
        if (prev.letterId !== letterId) return prev;
        const next = { ...prev, isPinned: false };
        writeRandomLetterCache(userId, next);
        return next;
      });
    },
  });
}
