import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnalysisResultSection from "@/components/create/detail/AnalysisResultSection";
import type { CreateResultPayload } from "@/types/create";
import type { CreateFrom } from "@/types/from";

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
    <AnalysisResultSection
      content={state.content}
      aiResult={state.aiResult}
      from={fromDraft}
      onSelectRecipient={() =>
        navigate("/create/from", {
        state: {
          ...(state ?? {}),
          selectedFromDraft: fromDraft,
        },
      })

      }
      onNext={() => {
        // 프롬 생성 + 편지 생성 api 호출
      }}
    />
  );
}

