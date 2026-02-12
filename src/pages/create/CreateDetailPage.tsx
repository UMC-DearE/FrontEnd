import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { CreateResultPayload } from "@/types/create";
import type { CreateFrom } from "@/types/from";
import LetterForm from "@/components/common/LetterForm";
import useToast from "@/hooks/useToast";
import { useCreateLetter } from "@/hooks/mutations/useCreateLetter";
import { useCreateFrom } from "@/hooks/mutations/useCreateFrom";
import CreateDetailHeader from "@/components/header/CreateDetailHeader";

type LocationState =
  | (CreateResultPayload & {
      selectedFromDraft?: CreateFrom;
      imageIds?: number[];
      images?: File[];
      date?: string;
      unknownDate?: boolean;
    })
  | null;

export default function CreateDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [fromDraft, setFromDraft] = useState<CreateFrom | undefined>(
    state?.selectedFromDraft
  );
  const [content, setContent] = useState<string>(state?.content ?? "");
  const [date, setDate] = useState<string>(state?.date ?? "");
  const [unknownDate, setUnknownDate] = useState<boolean>(
    state?.unknownDate ?? false
  );
  const toast = useToast();
  const createLetterMutation = useCreateLetter();
  const createFromMutation = useCreateFrom();


  useEffect(() => {
    if (!state) {
      navigate("/create", { replace: true });
      return;
    }
    if (state.selectedFromDraft) {
      setFromDraft(state.selectedFromDraft);
    }
  }, [state, navigate]);

  if (!state) return null;

  const headerImages = state.images ?? [];

  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[393px]">
      <CreateDetailHeader images={headerImages} />
      </div>
      </div>

      <div className="mt-[129px] flex-1 px-4">
        <LetterForm
      mode="create"
      content={content}
      aiResult={state.aiResult}
      from={fromDraft}
      initialDate={date}
      initialUnknownDate={unknownDate}
      onDateChange={setDate}
      onUnknownDateChange={setUnknownDate}
      onContentChange={(v) => setContent(v)}
      // 사용자가 content 수정하면 state가 갱신됨, 최종 content는 사용자가 수정한 값
      onSelectRecipient={() =>
        navigate("/create/from", {
          state: {
            ...(state ?? {}),
            selectedFromDraft: fromDraft,
            date,
            unknownDate,
          },
        })
      }
      // 편지 추가 버튼 - fromDraft에 fromId 없으면(기존 목록에서 불러온 프롬이 아님, 새 프롬) 프롬 생성 -> 편지 생성 api 호출
      onSubmit={async (payload) => {
        let fromId = payload.from?.fromId ?? fromDraft?.fromId;
        if (!fromDraft) {
          toast.show("받는 사람을 선택해주세요.");
          return;
        }

        try {
          if (!fromId) {
            const fromRes = await createFromMutation.mutateAsync({
              name: fromDraft.name,
              bgColor: fromDraft.bgColor,
              fontColor: fromDraft.fontColor,
            });

            if (!fromRes.success) {
              toast.show(fromRes.message || "프롬 생성에 실패했습니다.");
              return;
            }

            fromId = fromRes.data.fromId;
          }

          const receivedAt = payload.unknownDate ? "" : payload.date ?? "";
          const finalContent = payload.content ?? content;

          const uniqueImageIds = Array.from(new Set(state.imageIds ?? []));

          const letterRes = await createLetterMutation.mutateAsync({
            content: finalContent,
            aiSummary: state.aiResult.summary,
            emotionIds: state.aiResult.emotions.map((e) => e.emotionId),
            fromId,
            receivedAt,
            imageIds: uniqueImageIds,
          });

          if (!letterRes.success) {
            toast.show(letterRes.message || "편지 생성에 실패했습니다.");
            return;
          }

          navigate(`/letter/${letterRes.data.letterId}`, { replace: true });
        } catch {
          toast.show("편지 생성 중 오류가 발생했습니다.");
        }
      }}
        />
      </div>
    </>
  );
}
