import { api } from '@/api/http';
import type { ApiResponse } from '@/types/home';

export type HomeUserDto = {
  userId: number;
  nickname: string;
  intro: string | null;
  imgUrl: string | null;
};

export type HomeSettingDto = {
  homeColor: string;
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
  return res.data.data;
}

type UpdateHomeColorResponse = ApiResponse<{ homeColor: string }>;

export async function updateHomeColor(homeColor: string) {
  const res = await api.patch<UpdateHomeColorResponse>('/users/me/homecolor', { homeColor });
  return res.data.data.homeColor;
}
