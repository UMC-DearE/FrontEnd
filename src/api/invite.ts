import { api, publicApi } from '@/api/http';
import type { CommonResponse } from '@/types/common';
import type { InviteLink, InviteVerify } from '@/types/invite';

// 내 초대 코드 및 링크 발급
// 서버에서 사용자당 하나의 코드를 재사용하므로 반복 호출해도 링크가 새로 생기지 않음
export async function getInviteLink() {
  const { data } = await api.get<CommonResponse<InviteLink>>('/invites/code');
  return data.data;
}

// 초대 코드 유효성 검증
// 비로그인 상태로 초대 링크를 타고 들어오는 경우이므로 인증 헤더가 붙지 않는 publicApi 사용
export async function getInviteVerify(inviteCode: string) {
  const { data } = await publicApi.get<CommonResponse<InviteVerify>>(
    `/invites/${encodeURIComponent(inviteCode)}/validate`
  );
  return data.data;
}
