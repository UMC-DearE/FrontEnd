// 편지 추가 - 내용 분석 및 편지 수정 공통 UI

import { useState } from "react";
import { EmotionTag } from "@/components/common/EmotionTag";
import { BottomButton } from "@/components/common/BottomButton";
import { FromBadge } from "@/components/common/FromBadge";
import aiSummary from "@/assets/create/ai-summary.svg";
import selectFrom from "@/assets/create/select-from.svg";
import type { LetterFormProps } from "@/types/letterForm";

export default function LetterForm({
  mode,
  content,
  aiResult,
  from,
  initialDate = "",
  initialUnknownDate = false,
  onSelectRecipient,
  onSubmit,
}: LetterFormProps) {
  const [date, setDate] = useState(initialDate);
  const [unknownDate, setUnknownDate] = useState(initialUnknownDate);

  const canProceed = Boolean(from) && (unknownDate || date);

  return (
    <div className="flex flex-col h-full pt-1">
      <div className="border border-[#E6E7E9] rounded-xl px-4 py-[14px] text-sm leading-relaxed text-[#555557] mb-6 max-h-[176px] overflow-y-auto">{content}</div>

      <div className="mb-6">
        <p className="text-base font-semibold text-primary mb-2">누구에게 받은 편지인가요?</p>

        <div
          role="button"
          onClick={onSelectRecipient}
          className="w-full h-[45px]  border border-[#E6E7E9] rounded-xl px-4 text-sm font-medium outline-none flex items-center justify-between cursor-pointer"
        >
          {from ? (
            <FromBadge name={from.name} backgroundColor={from.backgroundColor} textColor={from.textColor} />
          ) : (
            <span className="text-[#C7C7CC]">이름을 생성하거나 선택하세요</span>
          )}
          <img src={selectFrom} alt="" className="w-5 h-5" />
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
        <div className="flex items-center gap-2 bg-[#F7F7F7] rounded-xl p-4 text-sm text-[#555557] leading-relaxed">
          <img src={aiSummary} alt="ai summary" className="w-[19px] h-[19px] flex-shrink-0" />
          <p className="ml-2">{aiResult.summary}</p>
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
          onClick={() =>
            from &&
            onSubmit({
              from,
              date,
              unknownDate,
            })
          }
        >
          {mode === "edit" ? "수정 완료" : "편지 추가하기"}
        </BottomButton>
      </div>
    </div>
  );
}
