import { api } from '@/api/http';

export type TermType = 'SERVICE' | 'PRIVACY';

export type ApiClause = {
  clauseTitle: string;
  clauseContent: string;
};

// 명세서 기준 필드. clauses는 문서 예시엔 없지만 실제 응답에 있을 수도 있어서 optional로 같이 받아둠
export type ApiTermListItem = {
  termId: number;
  title: string;
  type: TermType;
  content: string;
  clauses?: ApiClause[];
  isRequired: boolean;
  effectiveAt: string;
  version: string;
  isAgreed: boolean;
  agreedAt: string | null;
};

// 로그인 상태(Authorization 필요)에서 약관 목록 조회 - 마이페이지용
export async function getTerms(type?: TermType) {
  const res = await api.get('/terms', {
    params: type ? { type } : undefined,
  });
  return res.data.data.terms as ApiTermListItem[];
}