import { api } from '@/api/http';
import type { ApiResponse } from '@/types/home';

export type StickerCreateRequest = {
  imageId: number;
  posX: number;
  posY: number;
  posZ: number;
  rotation: number;
  scale: number;
};

export type StickerUpdateRequest = {
  posX: number;
  posY: number;
  posZ: number;
  rotation: number;
  scale: number;
};

type StickerCreateResponse = ApiResponse<{
  stickerId: number;
}>;

type StickerUpdateResponse = ApiResponse<{
  stickerId: number;
}>;

type StickerDeleteResponse = ApiResponse<{
  stickerId: number;
}>;

export async function createSticker(body: StickerCreateRequest) {
  const res = await api.post<StickerCreateResponse>('/stickers', body);
  return res.data.data;
}

export async function updateSticker(stickerId: string | number, body: StickerUpdateRequest) {
  const res = await api.patch<StickerUpdateResponse>(`/stickers/${stickerId}`, body);
  return res.data.data;
}

export async function deleteSticker(stickerId: string | number) {
  const res = await api.delete<StickerDeleteResponse>(`/stickers/${stickerId}`);
  return res.data.data;
}
