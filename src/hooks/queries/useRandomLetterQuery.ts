import { useQuery } from '@tanstack/react-query';
import { getRandomLetter } from '@/api/letter';
import type { RandomLetterData } from '@/types/letter';

export const randomLetterKey = ['randomLetter'];

function getMsUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

export function useRandomLetterQuery() {
  return useQuery<RandomLetterData>({
    queryKey: randomLetterKey,
    queryFn: getRandomLetter,
    staleTime: getMsUntilMidnight(),
    refetchOnWindowFocus: false,
  });
}
