import { useEffect, useRef, useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import FolderSelect from "@/components/letter/FolderSelect";
import { getMockFolders, type MockFolder } from "@/mocks/mockFolder";
import useToast from "@/hooks/useToast";
import type { CreateFrom } from "@/types/from";
import { EmotionTag } from "@/components/common/EmotionTag";
import { BottomButton } from "@/components/common/BottomButton";
import { FromBadge } from "@/components/common/FromBadge";
import LetterDetailBottomSheet from "./LetterDetailBottomSheet";
import aiSummary from "@/assets/create/ai-summary.svg";
import upBar from "@/assets/letter/up-bar.svg";
import downBar from "@/assets/letter/down-bar.svg";
import heartOutlineIcon from "@/assets/letterPage/heart-outline.svg";
import heartFillIcon from "@/assets/letterPage/heart-filled.svg";
import { likeLetter, unlikeLetter, patchLetterReply, deleteLetterReply } from "@/api/letter";
import html2canvas from "html2canvas";
import type { AnalyzeLetterResponse } from "@/types/create";

type LayoutContext = {
  setFixedAction: (
    payload: { node: React.ReactNode; bgColor?: string } | null
  ) => void;
};

interface Props {
  letterId: number;
  isLiked: boolean;
  content: string;
  aiResult: AnalyzeLetterResponse;
  from: CreateFrom;
  receivedAt?: string | null;
  // folder metadata object; null if not in a folder
  folder?: { folderId: number; folderName: string } | null;
  reply?: string;
  onSave?: () => void;
  onAddToFolder?: (folderId: number) => void;
  onRemoveFromFolder?: () => void;
  onEdit: () => void;
}

// 캡처한 편지 카드를 둥근 모서리로 자르는 함수
function roundCanvas(source: HTMLCanvasElement, radius = 16) {
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;

  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;

  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(canvas.width - radius, 0);
  ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
  ctx.lineTo(canvas.width, canvas.height - radius);
  ctx.quadraticCurveTo(
    canvas.width,
    canvas.height,
    canvas.width - radius,
    canvas.height
  );
  ctx.lineTo(radius, canvas.height);
  ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.clip();

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, 0, 0);

  return canvas;
}

export default function LetterDetailSection({
  letterId,
  isLiked,
  content,
  aiResult,
  from,
  receivedAt = "2025.06.02",
  folder = null,
  reply: initialReply,
  onSave,
  onAddToFolder,
  onRemoveFromFolder,
  onEdit,
}: Props) {
  const { setFixedAction } = useOutletContext<LayoutContext>();

  const cardRef = useRef<HTMLDivElement | null>(null);
  const toast = useToast();

  const [openSummary, setOpenSummary] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openFolderSelect, setOpenFolderSelect] = useState(false);
  const [folders, setFolders] = useState<MockFolder[]>([]);
  const [savedReply, setSavedReply] = useState(initialReply ?? "");
  const [draftReply, setDraftReply] = useState("");
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);

    // 헤더 더보기 버튼에서 이벤트로 열리는 구조
    useEffect(() => {
    const handleOpen = () => setOpenMore(true);
    window.addEventListener("open-letter-more", handleOpen as EventListener);
    return () =>
      window.removeEventListener("open-letter-more", handleOpen as EventListener);
  }, []);
  const [liked, setLiked] = useState(isLiked);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);
  const handleSaveCard = useCallback(async () => {
    if (onSave) onSave();

    const el = cardRef.current;
    if (!el) return;

    const originalCanvas = await html2canvas(el, {
      backgroundColor: "#ffffff",
      scale: Math.min(2, window.devicePixelRatio || 1),
      useCORS: true,
      onclone: (doc) => {
        const clonedEl = doc.querySelector(
          "[data-letter-card]"
        ) as HTMLElement | null;

        if (!clonedEl) return;

        // 기존 shadow 제거해야지 안에 회색 비침 현상 방지
        clonedEl.style.boxShadow = "none";
        (clonedEl.style as any).webkitBoxShadow = "none";

        // 전체 overflow visible로 변경(캡쳐할 때만)
        clonedEl.style.overflow = "visible";

        clonedEl.querySelectorAll("[data-from-badge-text]").forEach((el) => {
        const text = el as HTMLElement;

        // glyph 기준선 보정 - 프롬 뱃지 정렬 맞추기
        text.style.transform = "translateY(-5px)";
        text.style.lineHeight = "1";
      });

        const scrollArea = clonedEl.querySelector(
          ".thin-scrollbar"
        ) as HTMLElement | null;

        if (scrollArea) {
          scrollArea.style.maxHeight = "none";
          scrollArea.style.overflow = "visible";
        }

        // 내부의 배경을 모두 흰색으로 강제하되 FromBadge는 유지
        const all = Array.from(clonedEl.querySelectorAll<HTMLElement>("*"));
        for (const ch of all) {
          try {
            if (ch.closest("[data-from-badge]")) continue;

            ch.style.background = "#ffffff";
            ch.style.backgroundColor = "#ffffff";
            ch.style.backgroundImage = "none";
            ch.style.boxShadow = "none";
            (ch.style as any).webkitBoxShadow = "none";
            if (!ch.style.borderColor) ch.style.borderColor = "#E6E7E9";
          } catch (e) {
          }
        }
      },
    });

    const roundedCanvas = roundCanvas(originalCanvas, 24);

    roundedCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "letter-card.png";
      a.click();
      URL.revokeObjectURL(url);
    });
  }, [onSave]);

// 폴더 없을 경우 토스트 띄우기(부모 컴포넌트에서 미리 폴더 불러오기 - 폴더 선택 모달에 넘겨줌)

  useEffect(() => {
    setFixedAction({
      node: (
        <BottomButton onClick={handleSaveCard}>
          편지 카드 저장
        </BottomButton>
      ),
      bgColor: "#F8F8F8",
    });

    return () => {
      setFixedAction(null);
    };
  }, [setFixedAction, handleSaveCard]);


  const handleOpenFolderSelect = async () => {
    const list = await getMockFolders();
    if (list.length === 0) {
      toast.show("생성된 폴더가 없습니다", 1200);
      return;
    }
    setFolders(list);
    setOpenFolderSelect(true);
  };
  // receivedAt 포맷
  const displayReceivedAt = (() => {
    if (receivedAt === null) return "-"; // null이면 -로 처리
    if (!receivedAt) return receivedAt;
    if (/^\d{4}\.\d{2}\.\d{2}$/.test(receivedAt)) return receivedAt;

    const d = new Date(receivedAt);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${y}.${m}.${dd}`;
    }

    return receivedAt.slice(0, 10).replace(/-/g, ".");
  })();


  return (
    <div className="flex flex-col pt-1">
      <div
        ref={cardRef}
        data-letter-card
        className="mb-6 rounded-xl border border-[#E6E7E9] bg-white p-4 text-sm text-[#555557] shadow-[0_0_6px_rgba(0,0,0,0.05)]"
      >
        <div className="mb-3 flex items-center justify-between border-b border-[#E6E7E9] pb-3">
          <FromBadge
            name={from.name}
            backgroundColor={from.backgroundColor}
            textColor={from.textColor}
          />
            <button
              type="button"
              onClick={async () => {
                if (likeLoading || !letterId) return;
                setLikeLoading(true);
                const next = !liked;
                setLiked(next);
                try {
                  if (next) {
                    const res = await likeLetter(letterId);
                    setLiked(res.data.liked);
                  } else {
                    const res = await unlikeLetter(letterId);
                    setLiked(res.data.liked);
                  }
                } catch {
                  setLiked(!next);
                  toast.show("좋아요 처리에 실패했습니다.");
                } finally {
                  setLikeLoading(false);
                }
              }}
              className="w-[13px] h-4 cursor-pointer"
              aria-pressed={liked}
              disabled={likeLoading}
            >
              <img
                src={liked ? heartFillIcon : heartOutlineIcon}
                alt="like"
                className="w-[13px] h-[12px]"
              />
            </button>
        </div>

        <div className="max-h-[250px] overflow-y-auto pr-2 thin-scrollbar">
          <p className="whitespace-pre-line text-sm leading-relaxed text-primary">
            {content}
          </p>
        </div>

        <div className="mt-2 flex justify-end">
          <span className="text-xs font-medium text-[#9D9D9F]">
            {displayReceivedAt}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setOpenSummary((v) => !v)}
          className="mb-2 flex w-full items-center justify-between text-base font-semibold text-primary"
        >
          AI 한 줄 요약
          <img src={openSummary ? upBar : downBar} alt={openSummary ? "열림" : "닫힘"} />
        </button>

        {openSummary && (
          <div className="flex items-center gap-2 rounded-xl border border-[#E6E7E9] bg-white p-4 text-sm text-[#555557]">
            <img src={aiSummary} alt="" className="w-[19px] h-[19px]" />
            <p>{aiResult.summary}</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <p className="mb-2 text-base font-semibold text-primary">
          태그된 감정
        </p>
        <div className="flex flex-wrap gap-2">
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
        <p className="mb-2 text-base font-semibold text-primary">답장하기</p>
        {/* 이미 답장이 있는 경우 */}
        {savedReply && !isEditingReply ? (
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              setDraftReply(savedReply);
              setIsEditingReply(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setDraftReply(savedReply);
                setIsEditingReply(true);
              }
            }}
            className="rounded-xl border border-[#E6E7E9] bg-white px-4 py-[14px] text-sm text-[#555557]"
          >
            {savedReply}
          </div>
        ) : (
          <div className="relative">
            <input
              value={draftReply}
              onChange={(e) => setDraftReply(e.target.value)}
              maxLength={100}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="답장을 적어보세요"
              className={`
                w-full h-[45px]
                border border-[#E6E7E9]
                rounded-xl px-4 pr-28
                font-medium text-sm
                bg-white text-primary placeholder-[#C2C4C7]
                outline-none
              `}
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              {savedReply && (
                <button
                  type="button"
                  onClick={async () => {
                    if (replyLoading) return;
                    setReplyLoading(true);
                    try {
                      const res = await deleteLetterReply(letterId);
                      if (!res.success) {
                        toast.show(res.message || "답장 삭제에 실패했습니다.");
                        return;
                      }
                      setSavedReply("");
                      setDraftReply("");
                      setIsEditingReply(false);
                    } catch {
                      toast.show("답장 삭제 중 오류가 발생했습니다.");
                    } finally {
                      setReplyLoading(false);
                    }
                  }}
                  className="h-[36px] px-3 rounded-lg text-sm font-medium bg-[#E6E7E9] text-[#555557]"
                  disabled={replyLoading}
                >
                  삭제
                </button>
              )}
              <button
                type="button"
                disabled={!draftReply.trim() || replyLoading}
                onClick={async () => {
                  if (!draftReply.trim()) return;
                  setReplyLoading(true);
                  try {
                    const res = await patchLetterReply(letterId, { reply: draftReply.trim() });
                    if (!res.success) {
                      toast.show(res.message || "답장 전송에 실패했습니다.");
                      return;
                    }
                    setSavedReply(draftReply.trim());
                    setIsEditingReply(false);
                  } catch {
                    toast.show("답장 전송 중 오류가 발생했습니다.");
                  } finally {
                    setReplyLoading(false);
                  }
                }}
                className={`h-[36px] px-3 rounded-lg text-sm font-medium ${
                  draftReply.trim()
                    ? "bg-[#555557] text-white"
                    : "bg-[#E6E7E9] text-[#9D9D9F] cursor-not-allowed"
                }`}
              >
                전송
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 바텀시트 / 폴더 */}
      <LetterDetailBottomSheet
        open={openMore}
        folder={folder}
        onClose={() => setOpenMore(false)}
        onAddToFolder={handleOpenFolderSelect}
        onRemoveFromFolder={() => onRemoveFromFolder?.()}
        onDeleteLetter={() => console.log("편지 삭제")}
        onEdit={() => {
          setOpenMore(false);
          onEdit();
        }}
      />

      <FolderSelect
        open={openFolderSelect}
        folders={folders}
        onClose={() => setOpenFolderSelect(false)}
        onSelect={(folderId) => onAddToFolder?.(folderId)}
      />
    </div>
  );
}

