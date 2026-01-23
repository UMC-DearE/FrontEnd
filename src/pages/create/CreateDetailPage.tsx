import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnalysisResultSection from "@/components/create/detail/AnalysisResultSection";
import type { CreateResultPayload } from "@/types/create";

export default function CreateDetailPage() {
  const location = useLocation();
  const { state } = location as {
    state: (CreateResultPayload & { selectedRecipient?: string }) | null;
  };
  const navigate = useNavigate();

  const [recipient, setRecipient] = useState<string>(state?.selectedRecipient ?? "");

  useEffect(() => {
    if (!state) {
      navigate("/create");
      return;
    }
    const selected = (location.state as any)?.selectedRecipient;
    if (selected) setRecipient(selected);
  }, [location.state]);

  if (!state) return null;

  return (
    <AnalysisResultSection
      content={state.content}
      aiResult={state.aiResult}
      recipient={recipient}
      onSelectRecipient={() => navigate("/create/from", { state })}
      onNext={() => { // 편지 추가하기 버튼 누르면 편지 생성 api 호출
      }}
    />
  );
}
