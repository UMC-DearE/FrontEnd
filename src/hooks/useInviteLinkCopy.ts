// 초대 링크 복사

import { useInviteLink } from '@/hooks/queries/useInviteLink';
import { buildInviteShareText } from '@/constants/invite';
import { copyToClipboard } from '@/utils/clipboard';
import useToast from '@/hooks/useToast';

// 초대 시트가 열려 있는지
export function useInviteLinkCopy(enabled: boolean) {
  const toast = useToast();
  const { data: inviteLink, refetch: refetchInviteLink } = useInviteLink(enabled);

  return async () => {
    // 시트 열릴 때 미리 받아 둔 링크를 우선 사용, 아직 없으면 이 시점에 요청
    const url = inviteLink?.inviteUrl ?? (await refetchInviteLink()).data?.inviteUrl;

    if (!url) {
      toast.show('초대 링크를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.');
      return;
    }

    const copied = await copyToClipboard(buildInviteShareText(url));
    toast.show(copied ? '초대 링크를 복사했어요' : '초대 링크 복사에 실패했어요');
  };
}
