export type Letter = {
  id: number;
  content: string;
  isLiked: boolean;
  receiveAt: string;
  createdAt: string;
  fromId: number;
  fromName: string;
  fromBgColor: string;
  fromFontColor: string;
  folderId: number;
};

export type LetterListResponse = {
  success: boolean;
  code: string;
  message: string;
  result: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: Letter[];
  };
};

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

export interface AiAnalyzeResult {
  letterId: number;
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

  inFolder?: boolean;
  folderId?: number | null;
  folderName?: string | null;
}

export interface LetterDetailResponse {
  success: boolean;
  code: string;
  message: string;
  data: LetterDetailData;
}
