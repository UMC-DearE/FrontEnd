import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeInviteGuide, type HomeDataDto } from '@/api/home';
import type { MembershipStatusData } from '@/api/membership';
import { homeQueryKey } from '@/hooks/queries/homeKeys';
import { membershipQueryKey } from '@/hooks/queries/membershipKeys';

export function useCompleteInviteGuide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeInviteGuide,
    onMutate: () => {
      queryClient.setQueryData<HomeDataDto>(homeQueryKey, (prev) =>
        prev ? { ...prev, setting: { ...prev.setting, showDecorationUnlockGuide: false } } : prev
      );
      queryClient.setQueryData<MembershipStatusData>(membershipQueryKey, (prev) =>
        prev ? { ...prev, showDecorationUnlockGuide: false } : prev
      );
    },
  });
}
