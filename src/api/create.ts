import axiosInstance from "./axiosInstance";
import type { OcrRequestBody, OcrResponse, AnalyzeLetterRequest, AnalyzeLetterResponse, CreateLetterRequest, CreateLetterResponse } from "@/types/create";

export const runOcr = async (
  imageIds: number[]
): Promise<OcrResponse> => {
  const body: OcrRequestBody = { imageIds };
  const { data } = await axiosInstance.post<OcrResponse>('/letters/ocr', body);
  return data;
};

export const postAnalyzeLetter = async (body: AnalyzeLetterRequest): Promise<AnalyzeLetterResponse> => {
  const res = await axiosInstance.post('/analyze/letters', body);
  return res.data.data;
};

export const createLetter = async (
  payload: CreateLetterRequest
): Promise<CreateLetterResponse> => {
  const { data } = await axiosInstance.post<CreateLetterResponse>(
    "/letters",
    payload
  );
  return data;
};


