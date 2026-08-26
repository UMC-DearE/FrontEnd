// 서버 에러 응답 code

import axios from 'axios';

export const PLUS_REQUIRED = 'MEMBERSHIP_40301';

export function getErrorCode(error: unknown): string | undefined {
  if (!axios.isAxiosError(error)) return undefined;
  return (error.response?.data as { code?: string } | undefined)?.code;
}
