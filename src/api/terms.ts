import { api, publicApi } from '@/api/http';

export type TermType = 'SERVICE' | 'PRIVACY' | 'MARKETING';

export type ApiClause = {
  clauseTitle: string;
  clauseContent: string;
};

export type ApiTermListItem = {
  termId: number;
  title: string;
  type: TermType;
  clauses: ApiClause[];
  isRequired: boolean;
  effectiveAt: string;
  version: string;
  isActive?: boolean;
  content?: string;
};

/**
 * 회원가입용 약관 조회
 * - Authorization X
 * - signup_token 쿠키 필수
 * - withCredentials를 통해 signup_token 자동 전송
 */
export async function getSignupTerms(): Promise<ApiTermListItem[]> {
  const res = await publicApi.get('/auth/terms');

  return res.data.data.terms;
}

/**
 * 마이페이지용 약관 조회
 * - Authorization: Bearer Access_Token 필수
 * - type으로 SERVICE / PRIVACY 필터링 가능
 */
export async function getTerms(
  type?: 'SERVICE' | 'PRIVACY'
): Promise<ApiTermListItem[]> {
  const res = await api.get('/terms', {
    params: type ? { type } : undefined,
  });

  return res.data.data.terms;
}