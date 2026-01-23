import type { AiAnalyzeResult } from "@/types/letter";
import { EmotionTag } from "@/components/common/EmotionTag";
import { BottomButton } from "@/components/common/BottomButton";
import { useState } from "react";

interface Props {
  content: string;
  aiResult: AiAnalyzeResult;
  onNext?: () => void;
}

export default function AnalysisResultSection({
  content,
  aiResult,
  onNext,
}: Props) {
  const [recipient, setRecipient] = useState("");
  const [date, setDate] = useState("");
  const [unknownDate, setUnknownDate] = useState(false);

  const canProceed = recipient.trim().length > 0 && (unknownDate || date.trim().length > 0);

  return (
    <div className="flex flex-col h-full pt-2">
      <div className="border border-[#E6E7E9] rounded-xl p-4 text-sm leading-relaxed text-[#555557] mb-6 max-h-[176px] overflow-y-auto">
        {content}
      </div>

      <div className="mb-6">
        <p className="text-base font-semibold text-primary mb-2">누구에게 받은 편지인가요?</p>
        <div className="relative">
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="이름을 생성하거나 선택하세요"
            className="w-full h-[45px] border border-[#E6E7E9] rounded-xl px-4 text-sm font-medium outline-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C7C7CC]">▼</span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-base font-semibold text-primary mb-2">언제 받은 편지인가요?</p>

        <div className="flex items-center gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={unknownDate}
            className={`flex-1 h-[45px] border border-[#E6E7E9] rounded-xl px-4 text-sm font-medium outline-none
              ${date ? "text-[#555557]" : "text-[#C7C7CC]"}
              ${unknownDate ? "bg-[#F7F7F7]" : "bg-white"}
            `}
          />
          
          <label className="flex items-center gap-2 text-sm text-[#555557] font-medium">
            <input
              type="checkbox"
              checked={unknownDate}
              onChange={(e) => setUnknownDate(e.target.checked)}
              className="checkbox-accent checkbox-custom"
            />
            날짜 모름
          </label>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-base font-semibold text-primary mb-2">AI 한 줄 요약</p>
        <div className="flex items-start gap-2 bg-[#F7F7F7] rounded-xl p-4 text-sm text-[#555557] leading-relaxed">
          <span>✨</span>
          <p>{aiResult.summary}</p>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-base font-semibold text-primary mb-2">태그된 감정</p>

        <div className="flex gap-2 flex-wrap">
          {aiResult.emotions.map((emotion) => (
            <EmotionTag key={emotion.emotionId} label={emotion.emotionName} category={emotion.category} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[393px] -translate-x-1/2 bg-white px-4 pb-[52px] pt-3">
        <BottomButton
          disabled={!canProceed}
          onClick={() => {
            if (!canProceed) return;
            onNext?.();
          }}
        >
          편지 추가하기
        </BottomButton>
      </div>
    </div>
  );
}

