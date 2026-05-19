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

  const LINE_HEIGHT = 18;
  const MAX_LINES = 15;
  const PADDING_Y = 32;

  const MAX_HEIGHT = LINE_HEIGHT * MAX_LINES + PADDING_Y;

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';

    const nextHeight = Math.min(el.scrollHeight, MAX_HEIGHT);

    el.style.height = `${nextHeight}px`;
    el.style.overflowY =
      el.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange?.(e.target.value);
  };
  
// 날짜 프리뷰 MM-YY-DD 형식
const formatDatePreview = (value: string) => {
  if (!value) return "";
  const parts = value.split("-");
  if (parts.length !== 3) return value;
  const [year, month, day] = parts;
  if (!year || !month || !day) return value;
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) return value;
  return `${year.slice(2)}-${month}-${day}`;
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
            border border-[#E7E8EB]
            rounded-xl
            px-4 py-4
            text-sm text-[#585A5F]
            leading-[18px]
            mb-[24px]
            resize-none
            overflow-y-auto
            max-h-[320px]
            focus:ring-0
            focus:outline-none
            thin-scrollbar
          "
        />
      ) : (
        <div className="border border-[#E7E8EB] rounded-xl px-4 py-4 text-sm leading-[18px] text-[#585A5F] mb-6 max-h-[320px] overflow-y-auto thin-scrollbar">
          {content}
        </div>
      )}

      <div className="mb-[24px]">
        <p className="text-base font-semibold text-primary mb-[12px]">
          누구에게 받은 편지인가요?
        </p>

        <div
          role="button"
          onClick={onSelectRecipient}
          className="w-full h-[45px] border border-[#E7E8EB] rounded-xl px-4 text-sm font-medium flex items-center justify-between cursor-pointer"
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

      <div className="mb-[24px]">
        <p className="text-base font-semibold text-primary mb-[12px]">
          언제 받은 편지인가요?
        </p>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 h-[45px]">
            <input
              type="date"
              value={date}
              onChange={(e) => {
                const next = e.target.value; // 서버로 넘길 값: YYYY-MM-DD
                setDate(next);
                onDateChange?.(next);
              }}
              disabled={unknownDate}
              className="
                absolute inset-0 w-full h-full
                opacity-0 cursor-pointer
              "
            />

            <div
              className={`
                w-full h-[45px]
                border border-[#E7E8EB]
                rounded-xl px-4 text-sm font-medium
                flex items-center
                ${date ? "text-[#585A5F]" : "text-[#C7C7CC]"}
                ${unknownDate ? "bg-[#F7F8F9]" : "bg-[#FFFFFF]"}
              `}
            >
              {date ? formatDatePreview(date) : "YY-MM-DD"}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-[#585A5F]">
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

      <div className="mb-[24px]">
        <p className="text-base font-semibold text-primary mb-[12px]">
          한 줄 요약
        </p>
        <div className="flex items-center gap-3 bg-[#F7F8F9] rounded-xl px-[14px] py-[12px] text-sm text-[#585A5F] leading-relaxed">
          <img src={aiSummary} alt="" className="w-[19px] h-[19px]" />
          <p>{aiResult.summary}</p>
        </div>
      </div>

      <div className="mb-[80px]">
        <p className="text-base font-semibold text-primary mb-[12px]">
          수집된 감정
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
