export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export type HomeUserDto = {
  userId: number;
  nickname: string;
  intro: string;
  imgUrl: string;
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
