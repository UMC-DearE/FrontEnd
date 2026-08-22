import { api } from '@/api/http';

// 초대 링크로 진입한 경우 inviteCode를 함께 넘김
export async function getOAuthAuthorizeUrl(provider: 'kakao' | 'google', inviteCode?: string) {
  const res = await api.get(`/auth/oauth2/${provider}`, {
    params: inviteCode ? { inviteCode } : undefined,
  });
  return res.data.data.authorizeUrl as string;
}
