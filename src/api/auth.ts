import { api } from '@/api/http';

export async function getOAuthAuthorizeUrl(provider: 'kakao' | 'google') {
  const res = await api.get(`/auth/oauth2/${provider}`);
  return res.data.data.authorizeUrl as string;
}
