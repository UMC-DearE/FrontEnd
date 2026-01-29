import type { CreateFrom } from "./from";
import type { AiAnalyzeResult } from "./letter";

export interface LetterFormProps {
  mode: "create" | "edit";
  content: string;
  aiResult: AiAnalyzeResult;
  from?: CreateFrom;

  initialDate?: string;
  initialUnknownDate?: boolean;

  onSelectRecipient?: () => void;
  onSubmit: (payload: {
    from: CreateFrom;
    date?: string;
    unknownDate: boolean;
  }) => void;

  onCancel?: () => void; // edit일 때만 사용
}
