import { useQuery } from '@tanstack/react-query';
import { getInviteVerify } from '@/api/invite';
import { inviteKeys } from '@/hooks/queries/inviteKeys';

export function useInviteVerify(inviteCode: string | undefined) {
  return useQuery({
    queryKey: inviteKeys.verify(inviteCode ?? ''),
    queryFn: () => getInviteVerify(inviteCode as string),
    enabled: !!inviteCode,
    // 유효하지 않은 코드 -> 재시도 X
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
