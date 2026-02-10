import { api } from '@/api/http';
import type { LetterListPage } from '@/types/letter';

type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

// 랜덤 편지 고정
type UpdatePinnedResponse = ApiResponse<{ pinned: boolean }>;

export async function updateLetterPinned(letterId: number, pinned: boolean) {
  const res = await api.patch<UpdatePinnedResponse>(`/letters/${letterId}/pin`, { pinned });
  return res.data.data.pinned;
}

// 랜덤 편지
type RandomLetterResponse = ApiResponse<{
  hasLetter: boolean;
  date: {
    fullDate: string;
    month: string;
    day: number;
    dayOfWeek: string;
  };
  letterId: number;
  randomPhrase: string;
  isPinned: boolean;
}>;

export async function getRandomLetter() {
  const res = await api.get<RandomLetterResponse>('/letters/random');
  return res.data.data;
}

// 편지함 편지 목록
export type GetLetterListsParams = {
  page: number;
  size: number;
  sort?: string | string[];
  folderId?: number;
  fromId?: number;
  isLiked?: boolean;
  keyword?: string;
};

export const getLetterLists = async (params: GetLetterListsParams) => {
  const res = await api.get<ApiResponse<LetterListPage>>('/letters', { params });
  return res.data;
};
