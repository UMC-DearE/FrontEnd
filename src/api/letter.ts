import axiosInstance from "./axiosInstance";
import type { LetterDetailResponse } from "@/types/letter";

export const getLetterDetail = async (
  letterId: number
): Promise<LetterDetailResponse> => {
  const { data } = await axiosInstance.get<LetterDetailResponse>(
    `/letters/${letterId}`
  );
  return data;
};
