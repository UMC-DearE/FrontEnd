// 서버 에러 응답 code

import axios from 'axios';

export const PLUS_REQUIRED = 'MEMBERSHIP_40301';

export const FOLDER_FORBIDDEN = 'FOLDER_40301';
export const FOLDER_NOT_FOUND = 'FOLDER_40401';
export const LETTER_FORBIDDEN = 'LETTER_40301';
export const LETTER_NOT_FOUND = 'LETTER_40401';

export function getErrorCode(error: unknown): string | undefined {
  if (!axios.isAxiosError(error)) return undefined;
  return (error.response?.data as { code?: string } | undefined)?.code;
}
