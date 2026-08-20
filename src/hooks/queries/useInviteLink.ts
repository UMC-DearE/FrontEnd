import { useQuery } from '@tanstack/react-query';
import { getInviteLink } from '@/api/invite';
import { inviteKeys } from '@/hooks/queries/inviteKeys';
import { useAuthStore } from '@/stores/authStore';

// 시트가 열릴 때 미리 받아 두어야 복사 버튼 클릭 시 await 없이 바로 클립보드에 넣을 수 있음
export function useInviteLink(enabled: boolean) {
  const authStatus = useAuthStore((s) => s.authStatus);

  return useQuery({
    queryKey: inviteKeys.link,
    queryFn: getInviteLink,
    enabled: enabled && authStatus === 'authenticated',
    // 서버가 사용자당 코드를 재사용 -> 다시 받기 X
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
