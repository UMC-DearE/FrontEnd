// 편지 추가 - 내용 분석 및 편지 수정 공통 UI

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { EmotionTag } from "@/components/common/EmotionTag";
import { BottomButton } from "@/components/common/BottomButton";
import { FromBadge } from "@/components/common/FromBadge";
import aiSummary from "@/assets/create/ai-summary.svg";
import selectFrom from "@/assets/create/select-from.svg";
import type { LetterFormProps } from "@/types/letterForm";

type LayoutContext = {
  setFixedAction: (payload: { node: React.ReactNode; bgColor?: string } | null) => void;
};

export default function LetterForm({
  mode,
  content,
  aiResult,
  from,
  initialDate = "",
  initialUnknownDate = false,
  onSelectRecipient,
  onDateChange,
  onUnknownDateChange,
  onSubmit,
  onContentChange,
}: LetterFormProps) {
  const [date, setDate] = useState(initialDate);
  const [unknownDate, setUnknownDate] = useState(initialUnknownDate);

  const canProceed = Boolean(from) && (unknownDate || date);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setFixedAction } = useOutletContext<LayoutContext>();

  // 초기 OCR 텍스트 높이 자동 조절 및 내용 변경 시 높이 재조절(+ 최대 높이 초과 시 스크롤 생김)
  const MAX_HEIGHT = 176;

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";

    if (el.scrollHeight > MAX_HEIGHT) {
      el.style.height = `${MAX_HEIGHT}px`;
      el.style.overflowY = "auto";
    } else {
      el.style.height = `${el.scrollHeight}px`;
      el.style.overflowY = "hidden";
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange?.(e.target.value);
  };

  // initialDate / initialUnknownDate가 바뀌면 내부 상태도 맞춰줌
  useEffect(() => {
    setDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    setUnknownDate(initialUnknownDate);
  }, [initialUnknownDate]);

  useEffect(() => {
    setFixedAction({
      node: (
        <BottomButton
          disabled={!canProceed}
          onClick={() =>
            from &&
            onSubmit({
              from,
              date: unknownDate ? null : date,
              unknownDate,
              content,
            })
          }
        >
          {mode === "edit" ? "수정 완료" : "편지 추가하기"}
        </BottomButton>
      ),
      bgColor: '#FFFFFF',
    });

    return () => {
      setFixedAction(null);
    };
  }, [canProceed, from, date, unknownDate, content, mode, onSubmit, setFixedAction]);

  return (
    <div className="flex flex-col pt-1">
      {/* 편지 내용(이미지인 경우 - ocr 분석 텍스트 결과) 뿌리고 텍스트 영역 수정 가능 - 수정된 content 값을 서버로 전달(편지 생성할 때) */}
      {onContentChange ? (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          className="
            box-border
            border border-[#E6E7E9]
            rounded-xl
            px-4 py-[14px]
            text-sm text-[#555557]
            leading-relaxed
            mb-6
            resize-none
            overflow-y-hidden
            focus:ring-0
            focus:outline-none
            thin-scrollbar
          "
        />
      ) : (
        <div className="border border-[#E6E7E9] rounded-xl px-4 py-[14px] text-sm leading-relaxed text-[#555557] mb-6 max-h-[176px] overflow-y-auto thin-scrollbar">
          {content}
        </div>
      )}

      <div className="mb-6">
        <p className="text-base font-semibold text-primary mb-2">
          누구에게 받은 편지인가요?
        </p>

        <div
          role="button"
          onClick={onSelectRecipient}
          className="w-full h-[45px] border border-[#E6E7E9] rounded-xl px-4 text-sm font-medium flex items-center justify-between cursor-pointer"
        >
          {from ? (
            <FromBadge
              name={from.name}
              bgColor={from.bgColor}
              fontColor={from.fontColor}
            />
          ) : (
            <span className="text-[#C7C7CC]">
              이름을 생성하거나 선택하세요
            </span>
          )}
          <img src={selectFrom} alt="" className="w-5 h-5" />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-base font-semibold text-primary mb-2">
          언제 받은 편지인가요?
        </p>

        <div className="flex items-center gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => {
              const next = e.target.value;
              setDate(next);
              onDateChange?.(next);
            }}
            disabled={unknownDate}
            className={`
              flex-1 h-[45px]
              border border-[#E6E7E9]
              rounded-xl px-4 text-sm font-medium
              outline-none
              ${date ? "text-[#555557]" : "text-[#C7C7CC]"}
              ${unknownDate ? "bg-[#F7F7F7]" : "bg-white"}
            `}
          />

          <label className="flex items-center gap-2 text-sm font-medium text-[#555557]">
            <input
              type="checkbox"
              checked={unknownDate}
              onChange={(e) => {
                const checked = e.target.checked;
                setUnknownDate(checked);
                onUnknownDateChange?.(checked);
                if (checked) {
                  setDate("");
                  onDateChange?.("");
                }
              }}
              className="checkbox-accent checkbox-custom"
            />
            날짜 모름
          </label>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-base font-semibold text-primary mb-2">
          AI 한 줄 요약
        </p>
        <div className="flex items-center gap-2 bg-[#F7F7F7] rounded-xl p-4 text-sm text-[#555557] leading-relaxed">
          <img src={aiSummary} alt="" className="w-[19px] h-[19px]" />
          <p>{aiResult.summary}</p>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-base font-semibold text-primary mb-2">
          태그된 감정
        </p>
        <div className="flex gap-2 flex-wrap">
          {aiResult.emotions.map((emotion) => (
            <EmotionTag
              key={emotion.emotionId}
              label={emotion.emotionName}
              category={emotion.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
