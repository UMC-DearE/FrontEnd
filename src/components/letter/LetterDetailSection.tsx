import { useEffect, useState } from "react";
import FolderSelect from "@/components/letter/FolderSelect";
import type { AiAnalyzeResult } from "@/types/letter";
import type { CreateFrom } from "@/types/from";
import { EmotionTag } from "@/components/common/EmotionTag";
import { BottomButton } from "@/components/common/BottomButton";
import { FromBadge } from "@/components/common/FromBadge";
import aiSummary from "@/assets/create/ai-summary.svg";
import upBar from "@/assets/letter/up-bar.svg";
import downBar from "@/assets/letter/down-bar.svg";
import heartbtn from "@/assets/letter/heart.svg";
import LetterDetailBottomSheet from "./LetterDetailBottomSheet";

interface Props {
  content: string;
  aiResult: AiAnalyzeResult;
  from: CreateFrom;
  createdAt?: string;
  inFolder?: boolean;
  folderName?: string | null;
  reply?: string;
  onSave?: () => void;
  onAddToFolder?: (folderId: number) => void;
  onRemoveFromFolder?: () => void;
}

export default function LetterDetailSection({
  content,
  aiResult,
  from,
  createdAt = "2025.06.02",
  inFolder = false,
  folderName,
  onSave,
  onAddToFolder,
  onRemoveFromFolder,
  reply: initialReply,
}: Props) {
  const [openSummary, setOpenSummary] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openFolderSelect, setOpenFolderSelect] = useState(false);
  const [savedReply, setSavedReply] = useState(initialReply ?? "");
  const [draftReply, setDraftReply] = useState("");

  // 헤더 더보기 버튼에서 이벤트로 열리는 구조
  useEffect(() => {
    const handleOpen = () => setOpenMore(true);
    window.addEventListener("open-letter-more", handleOpen as EventListener);
    return () =>
      window.removeEventListener("open-letter-more", handleOpen as EventListener);
  }, []);

  // createdAt 포맷
  const displayCreatedAt = (() => {
    if (!createdAt) return createdAt;
    if (/^\d{4}\.\d{2}\.\d{2}$/.test(createdAt)) return createdAt;

    const d = new Date(createdAt);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${y}.${m}.${dd}`;
    }

    const first10 = createdAt.slice(0, 10).replace(/-/g, ".");
    return first10;
  })();

  return (
    <div className="flex flex-col h-full pt-1">
      <div className="border border-[#E6E7E9] bg-white rounded-xl px-4 py-[14px] text-sm text-[#555557] mb-6">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E6E7E9]">
          <FromBadge
            name={from.name}
            backgroundColor={from.backgroundColor}
            textColor={from.textColor}
          />
          <img
            src={heartbtn}
            alt="like"
            className="w-[13px] h-[12px]"
          />
        </div>

        <div className="max-h-[250px] overflow-y-auto pr-2 thin-scrollbar">
          <p className="leading-relaxed text-primary text-sm whitespace-pre-line">
            {content}
          </p>
        </div>

        <div className="mt-2 flex justify-end">
          <span className="text-xs font-medium text-[#9D9D9F]">
            {displayCreatedAt}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setOpenSummary((v) => !v)}
          className="w-full flex items-center justify-between text-base font-semibold text-primary mb-2"
        >
          AI 한 줄 요약
          <img src={openSummary ? upBar : downBar} alt={openSummary ? "열림" : "닫힘"} />
        </button>

        {openSummary && (
          <div className="flex items-center gap-2 text-[#555557] font-medium bg-white border border-[#E6E7E9] rounded-xl p-4 text-sm">
            <img
              src={aiSummary}
              alt="ai summary"
              className="w-[19px] h-[19px]flex-shrink-0"
            />
            <p className="ml-2">{aiResult.summary}</p>
          </div>
        )}
      </div>

      <div className="mb-6">
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

      <div className="mb-6">
        <p className="text-base font-semibold text-primary mb-2">
          답장하기
        </p>

        {/* 이미 답장이 있는 경우 */}
        {savedReply ? (
          <div className="border border-[#E6E7E9] bg-white rounded-xl px-4 py-[14px] text-sm text-[#555557] bg-[#F7F7F7]">
            {savedReply}
          </div>
        ) : (
          <>
            <div className="relative">
              <input
                value={draftReply}
                onChange={(e) => setDraftReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="답장을 적어보세요"
                className={`
                  w-full h-[45px]
                  border border-[#E6E7E9]
                  rounded-xl px-4 pr-18
                  font-medium text-sm
                  bg-white text-primary placeholder-[#C2C4C7]
                  outline-none
                `}
              />

              {/* 답장 없는 경우 - 임시 전송 버튼 + api 호출 */}
              <button
                type="button"
                disabled={!draftReply.trim()}
                onClick={() => {
                  console.log("답장 전송:", draftReply);
                  setSavedReply(draftReply);
                  setDraftReply("");
                }}
                className={`absolute right-2 top-1/2 -translate-y-1/2 h-[36px] px-3 rounded-lg text-sm font-medium ${
                  draftReply.trim()
                    ? "bg-[#555557] text-white"
                    : "bg-[#E6E7E9] text-[#9D9D9F] cursor-not-allowed"
                }`}
              >
                확인
              </button>
            </div>
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[393px] -translate-x-1/2 bg-[#F8F8F8] px-4 pb-[32px] pt-3">
        <BottomButton onClick={onSave}>
          편지 카드 저장
        </BottomButton>
      </div>

      {/* 더보기 바텀시트 */}
      <LetterDetailBottomSheet
        open={openMore}
        inFolder={inFolder}
        folderName={folderName}
        onClose={() => setOpenMore(false)}
        onAddToFolder={() => setOpenFolderSelect(true)}
        onRemoveFromFolder={() => onRemoveFromFolder?.()}
        onDeleteLetter={() => {
          console.log("편지 삭제 API 호출 준비");
        }}
      />

      <FolderSelect
        open={openFolderSelect}
        onClose={() => setOpenFolderSelect(false)}
        onSelect={(folderId) => onAddToFolder?.(folderId)}
      />
    </div>
  );
}
