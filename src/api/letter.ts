import { api } from '@/api/http';

type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

type UpdatePinnedResponse = ApiResponse<{ pinned: boolean }>;

export async function updateLetterPinned(letterId: number, pinned: boolean) {
  const res = await api.patch<UpdatePinnedResponse>(`/letters/${letterId}/pin`, { pinned });
  return res.data.data.pinned;
}
