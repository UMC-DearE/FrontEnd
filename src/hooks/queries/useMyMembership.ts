import { getMyMembership } from '@/api/membership';
import { useQuery } from '@tanstack/react-query';

export function useMyMembership() {
  return useQuery({
    queryKey: ['membership'],
    queryFn: getMyMembership,
  });
}
