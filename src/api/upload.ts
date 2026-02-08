// 이미지 업로드는 다른 곳에서도 씀 -> 통일해서 쓸 필요(파일 분리함)

import axiosInstance from "./axiosInstance";
import type { UploadImageResponse } from "@/types/upload";

export const uploadImage = async (
  file: File,
  dir: "profile" | "letter" | "sticker" | "folder"
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("dir", dir);

  const { data } = await axiosInstance.post<UploadImageResponse>("/images", formData);
  return data;
};