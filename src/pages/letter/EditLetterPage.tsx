import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LetterForm from "@/components/common/LetterForm";
import { getMockLetterDetail } from "@/mocks/mockLetterDetail";
import type { LetterDetailData } from "@/types/letter";
import type { CreateFrom } from "@/types/from";

type EditPageLocationState = {
  selectedFromDraft?: CreateFrom;
} | null;

export default function EditLetterPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as EditPageLocationState;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LetterDetailData | null>(null);

  // 실제로 LetterForm에 내려줄 from (초기값 + 수정 반영용)
  const [fromDraft, setFromDraft] = useState<CreateFrom | undefined>(undefined);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await getMockLetterDetail(Number(id));
        if (!mounted) return;

        if (!res.success) {
          setError(res.message);
          return;
        }

        setData(res.data);
        setContent(res.data.content ?? "");

        // 최초 진입 시 기본 from 세팅
        setFromDraft((prev) => {
        // 이미 선택된 프롬이 있으면 유지
        if (prev) return prev;

        return {
          name: res.data.fromName ?? "",
          backgroundColor: res.data.fromBgColor ?? "#FFF",
          textColor: res.data.fromFontColor ?? "#000",
        };
      });
      } catch {
        setError("편지 수정 정보를 불러오지 못했어요.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (locationState?.selectedFromDraft) {
      setFromDraft(locationState.selectedFromDraft);
    }
  }, [locationState]);

  if (loading) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!data || !fromDraft) return null;


  return (
    <LetterForm
      mode="edit"
      content={content}
      aiResult={{
        summary: data.aiSummary ?? "",
        emotions: data.emotions ?? [],
      }}
      from={fromDraft}
      initialDate={data.receivedAt ?? ""}
      initialUnknownDate={false}
      onContentChange={(v) => setContent(v)}
      onSelectRecipient={() =>
        navigate("/create/from", {
          state: {
            mode: "edit",
            letterId: id,
            selectedFromDraft: fromDraft,
          },
        })
      }
      onSubmit={(payload) => {
        console.log("편지 수정 payload", {
          ...payload,
          content, // 수정된 content
        });

        // 편지 수정 API 호출
        navigate(`/letter/${id}`);
      }}
    />
  );
}



