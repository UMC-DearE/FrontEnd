import axios from 'axios';
import { isRouteErrorResponse } from 'react-router-dom';
import type { AppErrorType } from '@/constants/error';

/** 라우터 에러 / axios 에러를 화면에 보여줄 에러 타입으로 변환 */
export function resolveErrorType(error: unknown): AppErrorType {
  // 매칭되는 라우트가 없을 때 react-router 가 던지는 404 등
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return 'notFound';
    if (error.status === 503) return 'maintenance';
    return 'server';
  }

  // 기기가 오프라인이면 응답 코드와 무관하게 네트워크 문제로 안내
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return 'network';
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    // 응답 자체가 오지 않은 경우 (타임아웃, DNS 실패 등)
    if (status === undefined) return 'network';

    if (status === 404) return 'notFound';
    if (status === 503) return 'maintenance';
    return 'server';
  }

  return 'server';
}
