import { api, publicApi } from '@/api/http';

export type TermType = 'SERVICE' | 'PRIVACY';

export type ApiClause = {
  clauseTitle: string;
  clauseContent: string;
};

export type ApiTerm = {
  termId: number;
  title: string;
  type: TermType;
  content?: string;
  clauses: ApiClause[];
  isRequired: boolean;
  effectiveAt: string;
  version: string;
  isActive: boolean;
};

// 인증 헤더가 자동으로 붙으면 안 되는 순수 조회용 -> publicApi
export async function getSignupTerms() {
  const res = await publicApi.get('/auth/terms');
  return res.data.data.terms as ApiTerm[];
}

// 아래 둘은 응답의 Authorization 헤더를 캐치해서 로그인 상태를 세팅해야 하므로
// 반드시 인터셉터가 걸린 api를 그대로 사용 (publicApi로 바꾸면 안 됨)
export async function postSignup(payload: { nickname: string; termIds: number[] }) {
  const res = await api.post('/auth/signup', payload);
  return res.data;
}

export async function postJwtRefresh() {
  const res = await api.post('/auth/jwt/refresh');
  return res.data;
}