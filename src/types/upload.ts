// 이미지 업로드는 다른 곳에서도 씀 -> 통일해서 쓸 필요(파일 분리함)
import type { CommonResponse } from "./common";

export interface UploadImageResponseData {
  imageId: number;
  key: string;
  url: string;
}

export type UploadImageResponse = CommonResponse<UploadImageResponseData>;