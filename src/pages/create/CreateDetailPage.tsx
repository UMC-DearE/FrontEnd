import { useLocation, useNavigate } from "react-router-dom";
import AnalysisResultSection from "@/components/create/detail/AnalysisResultSection";
import type { CreateResultPayload } from "@/types/create";

export default function CreateDetailPage() {
  const { state } = useLocation() as {
    state: CreateResultPayload | null;
  };
  const navigate = useNavigate();

  if (!state) {
    navigate("/create");
    return null;
  }

  return (
    <AnalysisResultSection
      content={state.content}
      aiResult={state.aiResult}
    />
  );
}
