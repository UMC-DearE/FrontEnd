import type { CommonResponse } from "./common";

export type AddMode = "IMAGE" | "TEXT";

export interface CreateResultPayload {
  content: string;
  aiResult: AnalyzeLetterResponse;
}

export interface OcrRequestBody {
  imageIds: number[];
}

export interface OcrImageResult {
  imageId: number;
  success: boolean;
  text: string;
  errorCode?: string;
  message?: string;
}

export interface OcrSummary {
  total: number;
  success: number;
  failed: number;
  partialFailure: boolean;
  failedImageIds: number[];
}

export interface OcrResponseData {
  combinedText: string;
  results: OcrImageResult[];
  summary: OcrSummary;
}

export type OcrResponse = CommonResponse<OcrResponseData>;

export interface EmotionCategory {
  categoryId: number;
  categoryType: string;
  bgColor: string;
  fontColor: string;
}

export interface Emotion {
  emotionId: number;
  emotionName: string;
  category: EmotionCategory;
}

export interface AnalyzeLetterRequest {
  content: string;
}

export interface AnalyzeLetterResponse {
  summary: string;
  emotions: Emotion[];
}

// 편지 생성
export interface CreateLetterRequest {
  content: string;
  aiSummary: string;
  emotionIds: number[];
  fromId: number;
  receivedAt: string;
  imageIds: number[];
}

export interface CreateLetterResponseData {
  letterId: number;
  createdAt: string;
}

export type CreateLetterResponse = CommonResponse<CreateLetterResponseData>;

