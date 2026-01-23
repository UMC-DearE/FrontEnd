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
