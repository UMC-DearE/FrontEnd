import type { Emotion } from './create';
import type { CommonResponse } from './common';

export type LetterFrom = {
  fromId: number;
  name: string;
  bgColor: string;
  fontColor: string;
};

export type Letter = {
  id: number;
  excerpt: string;
  isLiked: boolean;
  receivedAt: string;
  createdAt: string;
  from: LetterFrom;
  folderId: number;
};

export interface LetterListResult {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Letter[];
}

export type LetterListResponse = CommonResponse<LetterListResult>;

// 편지 상세 조회
export interface LetterDetailData {
  content: string;
  receivedAt?: string;
  aiSummary?: string;

  emotionTags?: Emotion[];
  isLiked?: boolean;
  reply?: string;

  from?: {
    fromId: number;
    name: string;
    bgColor: string;
    fontColor: string;
  };

  createdAt?: string;
  imageUrls?: string[];

  folder?: {
    folderId: number;
    folderName: string;
  } | null;
}

export type LetterDetailResponse = CommonResponse<LetterDetailData>;

// 편지 수정
export interface PatchLetterRequest {
  content: string;
  fromId: number;
  receivedAt: string;
}

export type PatchLetterResponse = CommonResponse<Record<string, never>>;

// 편지 답장 등록/수정
export interface PatchLetterReplyRequest {
  reply: string;
}

export type PatchLetterReplyResponse = CommonResponse<Record<string, never>>;

// 편지 답장 삭제
export type DeleteLetterReplyResponse = CommonResponse<Record<string, never>>;

// 편지 삭제
export type DeleteLetterResponse = CommonResponse<Record<string, never>>;

// 편지 좋아요
export interface LetterLikeData {
  liked: boolean;
}

export type LetterLikeResponse = CommonResponse<LetterLikeData>;

export type RandomLetterData = {
  hasLetter: boolean;
  date: {
    fullDate: string;
    month: string;
    day: number;
    dayOfWeek: string;
  };
  letterId: number;
  randomPhrase: string;
  isPinned: boolean;
};

export type RandomLetterApiResponse = {
  success: boolean;
  code: string;
  message: string;
  data: RandomLetterData;
};
