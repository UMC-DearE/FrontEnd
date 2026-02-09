import { api } from '@/api/http';
import type { ApiResponse, HomeDataApi, HomeResponse } from '@/types/home';

export async function getHome(): Promise<HomeDataApi> {
  const res = await api.get<HomeResponse>('/home');
  return res.data.data;
}

type UpdateHomeSettingResponse = ApiResponse<{
  setting: {
    homeColor: string;
  };
}>;

export async function updateHomeColor(homeColor: string) {
  const res = await api.patch<UpdateHomeSettingResponse>('/home/setting', {
    homeColor,
  });
  return res.data.data.setting.homeColor;
}
