import { useQuery } from '@tanstack/react-query';
import { getRandomLetter } from '@/api/letter';
import type { RandomLetterData } from '@/types/letter';
import { useMeQuery } from '@/hooks/queries/useMeQuery';

export const randomLetterKey = ['randomLetter'];

export function useRandomLetterQuery() {
  const { data: me } = useMeQuery();
  const userId = me?.userId;

  return useQuery<RandomLetterData>({
    queryKey: [...randomLetterKey, userId],
    queryFn: () => getRandomLetter(),
    enabled: typeof userId === 'number',
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
