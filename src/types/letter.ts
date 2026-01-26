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
