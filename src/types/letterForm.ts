import type { CreateFrom } from "./from";
import type { AnalyzeLetterResponse } from "./create";

export interface LetterFormProps {
  mode: "create" | "edit";
  content: string;
  aiResult: AnalyzeLetterResponse;
  from?: CreateFrom;

  initialDate?: string;
  initialUnknownDate?: boolean;

  onDateChange?: (value: string) => void;
  onUnknownDateChange?: (value: boolean) => void;

  onSelectRecipient?: () => void;
  onSubmit: (payload: {
    from: CreateFrom;
    date?: string | null;
    unknownDate: boolean;
    content?: string;
  }) => void;

  onContentChange?: (value: string) => void;

  onCancel?: () => void; // edit일 때만 사용
}
