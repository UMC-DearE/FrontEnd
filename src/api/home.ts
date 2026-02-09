import { api } from '@/api/http';
import type { ApiResponse, HomeDataDto } from '@/types/home';

export async function getHome(): Promise<HomeDataDto> {
  const res = await api.get<ApiResponse<HomeDataDto>>('/home');
  return res.data.data;
}

type UpdateHomeSettingDto = {
  setting: {
    homeColor: string;
  };
};

export async function updateHomeColor(homeColor: string) {
  const res = await api.patch<ApiResponse<UpdateHomeSettingDto>>('/home/setting', {
    homeColor,
  });
  return res.data.data.setting.homeColor;
}
