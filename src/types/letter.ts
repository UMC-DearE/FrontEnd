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

export type LetterListPage = {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  content: Letter[];
};

export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export type LetterListResponse = ApiResponse<LetterListPage>;

export interface EmotionCategory {
  categoryId: number;
  type: string;
  bgColor: string;
  fontColor: string;
}

export interface Emotion {
  emotionId: number;
  emotionName: string;
  category: EmotionCategory;
}

// AI 편지 내용 분석 결과(letterID는 params로 전달 - UI에서 몰라도 됨)
export interface AiAnalyzeResult {
  summary: string;
  emotions: Emotion[];
}

// 편지 상세 조회
export interface LetterDetailData {
  content: string;
  receivedAt?: string;
  aiSummary?: string;

  emotions?: Emotion[];
  isLiked?: boolean;
  reply?: string;

  fromName?: string;
  fromBgColor?: string;
  fromFontColor?: string;

  createdAt?: string;
  imageUrls?: string[];

  // If the letter belongs to a folder, `folder` contains metadata; otherwise `folder` is null.
  folder?: {
    folderId: number;
    folderName: string;
  } | null;
}

export interface LetterDetailResponse {
  success: boolean;
  code: string;
  message: string;
  data: LetterDetailData;
}
