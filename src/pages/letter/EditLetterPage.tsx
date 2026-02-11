import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LetterForm from "@/components/common/LetterForm";
import EditLetterHeader from "@/components/header/EditLetterHeader";
import EditLetterSkeleton from "@/components/skeleton/EditLetterSkeleton";
import { getLetterDetail } from "@/api/letter";
import type { LetterDetailData } from "@/types/letter";
import type { CreateFrom } from "@/types/from";
import useToast from "@/hooks/useToast";
import { useCreateFrom } from "@/hooks/mutations/useCreateFrom";
import { usePatchLetter } from "@/hooks/mutations/usePatchLetter";

type EditPageLocationState = {
  selectedFromDraft?: CreateFrom;
  date?: string;
  unknownDate?: boolean;
  imageUrls?: string[];
} | null;

export default function EditLetterPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as EditPageLocationState;
  const toast = useToast();
  const createFromMutation = useCreateFrom();
  const patchLetterMutation = usePatchLetter();

  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LetterDetailData | null>(null);

  // 실제로 LetterForm에 내려줄 from (초기값 + 수정 반영용)
  const [fromDraft, setFromDraft] = useState<CreateFrom | undefined>(undefined);
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>(locationState?.date ?? "");
  const [unknownDate, setUnknownDate] = useState<boolean>(
    locationState?.unknownDate ?? false
  );

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await getLetterDetail(Number(id));
        if (!mounted) return;

        if (!res.success) {
          setError(res.message);
          return;
        }

        setData(res.data);
        setContent(res.data.content ?? "");

        // 최초 진입 시 기본 from / 날짜 세팅
        setFromDraft((prev: CreateFrom | undefined) => {
          if (prev) return prev;

          console.log("edit imageUrls", res.data.imageUrls);

          const draft: CreateFrom = {
            fromId: res.data.from?.fromId,
            name: res.data.from?.name ?? "",
            bgColor: res.data.from?.bgColor ?? "#FFFFFF",
            fontColor: res.data.from?.fontColor ?? "#000000",
          };

          return draft;
        });

        if (locationState?.date === undefined && locationState?.unknownDate === undefined) {
          const v = res.data.receivedAt;
          setUnknownDate(!v);

          // 날짜 포맷 통일(YYYY-MM-DD) - 기존값 세팅
          if (!v) {
            setDate("");
          } else if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
            setDate(v);
          } else if (/^\d{4}\.\d{2}\.\d{2}$/.test(v)) {
            setDate(v.replace(/\./g, "-"));
          } else {
            const d = new Date(v);
            if (!Number.isNaN(d.getTime())) {
              const y = d.getFullYear();
              const m = String(d.getMonth() + 1).padStart(2, "0");
              const day = String(d.getDate()).padStart(2, "0");
              setDate(`${y}-${m}-${day}`);
            } else {
              setDate("");
            }
          }
        }
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

  useEffect(() => {
    if (!loading) {
      setShowSkeleton(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowSkeleton(true);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  if (loading && showSkeleton) return <EditLetterSkeleton />;
  if (loading) return null;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!data || !fromDraft) return null;

  const headerImages = locationState?.imageUrls ?? data.imageUrls ?? [];

  return (
    <>
      <EditLetterHeader images={headerImages} />

      <div className="mt-6 flex-1 px-4 pb-24">
        <LetterForm
      mode="edit"
      content={content}
      aiResult={{
        summary: data.aiSummary ?? "",
        emotions: data.emotionTags ?? [],
      }}
      from={fromDraft}
      initialDate={date}
      initialUnknownDate={unknownDate}
      onDateChange={setDate}
      onUnknownDateChange={setUnknownDate}
      onContentChange={(v) => setContent(v)}
      onSelectRecipient={() =>
        navigate("/create/from", {
          state: {
            mode: "edit",
            letterId: id,
            selectedFromDraft: fromDraft,
            date,
            unknownDate,
          },
        })
      }
      onSubmit={async (payload) => {
        const letterId = Number(id);
        if (!letterId) return;

        if (patchLetterMutation.isPending || createFromMutation.isPending) {
          return;
        }

        let fromId = payload.from?.fromId ?? fromDraft?.fromId;
        
        // 편지 수정 버튼 - fromDraft에 fromId 없으면(기존 목록에서 불러온 프롬이 아님, 새 프롬) 프롬 생성 -> 편지 수정 api 호출
        // 프롬 수정은 기존 프롬 => 다른 기존 프롬으로 변경 / 기존 프롬 => 새 프롬 생성
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

          const res = await patchLetterMutation.mutateAsync({
            letterId,
            payload: {
              content: finalContent,
              fromId,
              receivedAt,
            },
          });

          if (!res.success) {
            toast.show(res.message || "편지 수정에 실패했습니다.");
            return;
          }

          navigate(`/letter/${letterId}`);
        } catch {
          toast.show("편지 수정 중 오류가 발생했습니다.");
        }
      }}
        />
      </div>
    </>
  );
}



