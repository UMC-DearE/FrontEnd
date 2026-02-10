import { api } from '@/api/http';
import type {
  LetterDetailResponse,
  LetterLikeResponse,
  DeleteLetterResponse,
  DeleteLetterReplyResponse,
  PatchLetterReplyRequest,
  PatchLetterReplyResponse,
  PatchLetterRequest,
  PatchLetterResponse,
} from '@/types/letter';

export const getLetterDetail = async (letterId: number): Promise<LetterDetailResponse> => {
  const { data } = await api.get<LetterDetailResponse>(`/letters/${letterId}`);
  return data;
};

export const patchLetter = async (
  letterId: number,
  payload: PatchLetterRequest
): Promise<PatchLetterResponse> => {
  const { data } = await api.patch<PatchLetterResponse>(`/letters/${letterId}`, payload);
  return data;
};

export const likeLetter = async (letterId: number): Promise<LetterLikeResponse> => {
  const { data } = await api.put<LetterLikeResponse>(`/letters/${letterId}/like`);
  return data;
};

export const unlikeLetter = async (letterId: number): Promise<LetterLikeResponse> => {
  const { data } = await api.delete<LetterLikeResponse>(`/letters/${letterId}/like`);
  return data;
};

export const patchLetterReply = async (
  letterId: number,
  payload: PatchLetterReplyRequest
): Promise<PatchLetterReplyResponse> => {
  const { data } = await api.patch<PatchLetterReplyResponse>(`/letters/${letterId}/reply`, payload);
  return data;
};

export const deleteLetterReply = async (letterId: number): Promise<DeleteLetterReplyResponse> => {
  const { data } = await api.delete<DeleteLetterReplyResponse>(`/letters/${letterId}/reply`);
  return data;
};

export const deleteLetter = async (letterId: number): Promise<DeleteLetterResponse> => {
  const { data } = await api.delete<DeleteLetterResponse>(`/letters/${letterId}`);
  return data;
};

export const getLetterLists = async (params: {
  page: number;
  size: number;
  sort?: string;
  folderId?: number;
  fromId?: number;
  isLiked?: boolean;
}) => {
  const { data } = await api.get('/letters', { params });
  return { data };
};

export const updateLetterPinned = async (letterId: number, pinned: boolean) => {
  const { data } = await api.patch(`/letters/${letterId}/pin`, { pinned });
  return data;
};

export const pinLetter = async (letterId: number) => {
  const { data } = await api.patch(`/letters/${letterId}/pin`, { pinned: true });
  return data;
};

export const unpinLetter = async (letterId: number) => {
  const { data } = await api.patch(`/letters/${letterId}/pin`, { pinned: false });
  return data;
};

export const getRandomLetter = async () => {
  const { data } = await api.get('/letters/random');
  return data;
};
