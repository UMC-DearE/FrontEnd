import { api } from '@/api/http';
import type { ApiResponse } from '@/types/home';

export type StickerPayload = {
  imageId: number;
  posX: number;
  posY: number;
  posZ: number;
  rotation: number;
  scale: number;
};

export type CreateStickerData = {
  stickerId: number;
};

export async function createSticker(body: StickerPayload) {
  const res = await api.post<ApiResponse<CreateStickerData>>('/stickers', body);
  return res.data.data;
}

export async function updateSticker(stickerId: number, body: StickerPayload) {
  const res = await api.patch<ApiResponse<unknown>>(`/stickers/${stickerId}`, body);
  return res.data;
}

export async function deleteSticker(stickerId: number) {
  const res = await api.delete<ApiResponse<unknown>>(`/stickers/${stickerId}`);
  return res.data;
}
