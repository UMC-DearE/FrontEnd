import axiosInstance from "./axiosInstance";
import type {
  LetterDetailResponse,
  PatchLetterRequest,
  PatchLetterResponse,
} from "@/types/letter";

export const getLetterDetail = async (
  letterId: number
): Promise<LetterDetailResponse> => {
  const { data } = await axiosInstance.get<LetterDetailResponse>(
    `/letters/${letterId}`
  );
  return data;
};

export const patchLetter = async (
  letterId: number,
  payload: PatchLetterRequest
): Promise<PatchLetterResponse> => {
  const { data } = await axiosInstance.patch<PatchLetterResponse>(
    `/letters/${letterId}`,
    payload
  );
  return data;
};
