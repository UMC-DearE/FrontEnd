export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export type HomeUser = {
  userId: number;
  nickname: string;
  intro: string;
  imgUrl: string;
};

export type HomeSetting = {
  homeColor: string;
};

export type HomeSticker = {
  stickerId: number;
  imageId: number;
  imageUrl: string;
  posX: number;
  posY: number;
  posZ: number;
  rotation: number;
  scale: number;
};

export type HomeDataApi = {
  user: HomeUser;
  setting: HomeSetting;
  stickers: HomeSticker[];
};

export type HomeResponse = ApiResponse<HomeDataApi>;
