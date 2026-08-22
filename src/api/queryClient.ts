// React 외부에서도 캐시를 다뤄야 해서 싱글턴으로 분리

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

// 계정이 바뀔 때(로그아웃 / 세션 만료) 이전 계정 데이터를 전부 폐기
// 고정 키 + staleTime을 쓰는 쿼리가 다음 계정으로 새는 것을 방지
export function clearQueryCacheOnAuthChange() {
  queryClient.clear();
}
