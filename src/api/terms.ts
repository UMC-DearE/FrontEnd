import axios from 'axios';

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

// 회원가입용 signup_token 쿠키를 함께 전송하는 axios 인스턴스
const signupApi = axios.create({
  baseURL: 'https://api.deare.kr/api/v1',
  withCredentials: true, // signup_token 쿠키 자동 전송 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 회원가입용 약관 목록 조회 API
 * @param type 약관 유형 (SERVICE | PRIVACY) - 지정 시 해당 약관만 필터링하여 반환
 */
export async function getTerms(type?: TermType): Promise<ApiTermListItem[]> {
  // 백엔드 엔드포인트가 /auth/terms 혹은 /terms 인지 확인 필요 (일반적으로 /auth/terms 또는 /terms)
  const res = await signupApi.get('/auth/terms'); 
  const terms: ApiTermListItem[] = res.data.data.terms;

  if (type) {
    return terms.filter((term) => term.type === type);
  }

  return terms;
}