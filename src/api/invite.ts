import { api } from '@/api/http';
import type { CommonResponse } from '@/types/common';
import type { InviteLink } from '@/types/invite';

// 내 초대 코드 및 링크 발급
// 서버에서 사용자당 하나의 코드를 재사용하므로 반복 호출해도 링크가 새로 생기지 않음
export async function getInviteLink() {
  const { data } = await api.get<CommonResponse<InviteLink>>('/invites/code');
  return data.data;
}
