import { api } from '@/api/http';
import type { ApiResponse } from '@/types/home';
import { normalizeImageUrl } from '@/api/upload';

export type HomeUserDto = {
  userId: number;
  nickname: string;
  intro: string | null;
  imgUrl: string | null;
};

export type HomeSettingDto = {
  homeColor: string;
  showDecorationUnlockGuide?: boolean;
};

export type HomeStickerDto = {
  stickerId: number;
  imageId: number;
  imageUrl: string;
  posX: number;
  posY: number;
  posZ: number;
  rotation: number;
  scale: number;
};

export type HomeDataDto = {
  user: HomeUserDto;
  setting: HomeSettingDto;
  stickers: HomeStickerDto[];
};

type HomeResponse = ApiResponse<HomeDataDto>;

export async function getHome(): Promise<HomeDataDto> {
  const res = await api.get<HomeResponse>('/home');
  const data = res.data.data;

  if (data.user.imgUrl) {
    data.user.imgUrl = normalizeImageUrl(data.user.imgUrl);
  }

  if (Array.isArray(data.stickers)) {
    data.stickers = data.stickers.map((s) => ({
      ...s,
      imageUrl: normalizeImageUrl(s.imageUrl),
    }));
  }

  return data;
}

export type HomeStickerRequest = {
  imageId: number;
  posX: number;
  posY: number;
  posZ: number;
  rotation: number;
  scale: number;
};

export type UpdateHomeRequest = {
  homeColor: string;
  stickers: HomeStickerRequest[];
};

// 저장 성공 시 data는 null로 내려옴 (갱신된 홈은 GET /home 재조회로 받아야 함)
type UpdateHomeResponse = ApiResponse<null>;

export async function updateHome(body: UpdateHomeRequest) {
  await api.put<UpdateHomeResponse>('/home', body);
}

export async function completeInviteGuide() {
  await api.patch<ApiResponse<null>>('/home/invite-guide');
}
