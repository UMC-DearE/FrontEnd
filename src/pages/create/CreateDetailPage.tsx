import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { CreateResultPayload } from "@/types/create";
import type { CreateFrom } from "@/types/from";
import LetterForm from "@/components/common/LetterForm";
import { createLetter } from "@/api/create";
import useToast from "@/hooks/useToast";

type LocationState =
  | (CreateResultPayload & {
      selectedFromDraft?: CreateFrom;
      imageIds?: number[];
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
  const toast = useToast();

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

  return (
    <LetterForm
      mode="create"
      content={content}
      aiResult={state.aiResult}
      from={fromDraft}
      onContentChange={(v) => setContent(v)}
      // 사용자가 content 수정하면 state가 갱신됨, 최종 content는 사용자가 수정한 값
      onSelectRecipient={() =>
        navigate("/create/from", {
          state: {
            ...(state ?? {}),
            selectedFromDraft: fromDraft,
          },
        })
      }
      // 편지 추가 버튼 - 프롬 생성 -> 편지 생성 api 호출
      onSubmit={async (payload) => {
        const fromId = payload.from?.fromId ?? fromDraft?.fromId;
        if (!fromId) {
          toast.show("받는 사람을 선택해주세요.");
          return;
        }

        const receivedAt = payload.unknownDate ? "" : payload.date ?? "";
        const finalContent = payload.content ?? content;

        try {
          const res = await createLetter({
            content: finalContent,
            aiSummary: state.aiResult.summary,
            emotionIds: state.aiResult.emotions.map((e) => e.emotionId),
            fromId,
            receivedAt,
            imageIds: state.imageIds ?? [],
          });

          if (!res.success) {
            toast.show(res.message || "편지 생성에 실패했습니다.");
            return;
          }

          navigate(`/letter/${res.data.letterId}`, { replace: true });
        } catch (e) {
          toast.show("편지 생성 중 오류가 발생했습니다.");
        }
      }}
    />
  );
}

