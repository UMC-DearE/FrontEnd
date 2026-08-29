import { getMyMembership } from '@/api/membership';
import { useQuery } from '@tanstack/react-query';
import { membershipQueryKey } from './membershipKeys';

export function useMyMembership() {
  return useQuery({
    queryKey: membershipQueryKey,
    queryFn: getMyMembership,
  });
}
