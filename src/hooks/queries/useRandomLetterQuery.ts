import { useQuery } from '@tanstack/react-query';
import { getRandomLetter } from '@/api/letter';

export type RandomLetterResponse = {
  hasLetter: boolean;
  date: { month: string; day: number; dayOfWeek: string };
  letterId: number;
  randomPhrase: string;
  isPinned: boolean;
};

export const randomLetterKey = ['randomLetter'];

export function useRandomLetterQuery() {
  return useQuery({
    queryKey: randomLetterKey,
    queryFn: async () => {
      const res = await getRandomLetter();
      return res.data as RandomLetterResponse;
    },
  });
}
