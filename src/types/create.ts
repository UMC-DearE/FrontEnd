import type { AiAnalyzeResult } from "./letter";

export type AddMode = "IMAGE" | "TEXT";

export interface CreateResultPayload {
  content: string;
  aiResult: AiAnalyzeResult;
}
