import { useQuery } from '@tanstack/react-query';
import { getRandomLetter } from '@/api/letter';
import type { RandomLetterData } from '@/types/letter';

export const randomLetterKey = ['randomLetter'];

export function useRandomLetterQuery() {
  return useQuery<RandomLetterData>({
    queryKey: randomLetterKey,
    queryFn: getRandomLetter,
  });
}
