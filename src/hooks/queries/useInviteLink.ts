import { useQuery } from '@tanstack/react-query';
import { getInviteLink } from '@/api/invite';
import { inviteKeys } from '@/hooks/queries/inviteKeys';
import { useMeQuery } from '@/hooks/queries/useMeQuery';
import { useAuthStore } from '@/stores/authStore';

// 시트가 열릴 때 미리 받아 두어야 복사 버튼 클릭 시 await 없이 바로 클립보드에 넣을 수 있음
export function useInviteLink(enabled: boolean) {
  const authStatus = useAuthStore((s) => s.authStatus);

  // staleTime이 Infinity라 계정이 바뀌어도 캐시가 남을 수 있으므로 userId로 키를 분리
  const { data: me } = useMeQuery();
  const userId = me?.userId;

  return useQuery({
    queryKey: inviteKeys.link(userId),
    queryFn: getInviteLink,
    enabled: enabled && authStatus === 'authenticated' && userId !== undefined,
    // 서버가 사용자당 코드를 재사용
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
