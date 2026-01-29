import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { CreateResultPayload } from "@/types/create";
import type { CreateFrom } from "@/types/from";
import LetterForm from "@/components/common/LetterForm";

type LocationState =
  | (CreateResultPayload & {
      selectedFromDraft?: CreateFrom;
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
      onSubmit={() => {
        // 편지 추가 버튼 - 프롬 생성 / 편지 생성 api 호출
      }}
    />
  );
}

