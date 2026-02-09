import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LetterDetailSection from "@/components/letter/LetterDetailSection";
import { getLetterDetail } from "@/api/letter";
import type { LetterDetailData } from "@/types/letter";

export default function LetterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LetterDetailData | null>(null);

  useEffect(() => {
    let mounted = true;

    if (!id || Number.isNaN(Number(id))) {
      setError("잘못된 편지 ID입니다.");
      setLoading(false);
      return () => {
        mounted = false;
      };
    }

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
      } catch (e) {
        const message = (e as { response?: { data?: { message?: string } } })
          ?.response?.data?.message;
        setError(message || "편지 조회 중 오류가 발생했습니다.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <LetterDetailSection
      letterId={Number(id)}
      isLiked={data.isLiked ?? false}
      content={data.content}
      aiResult={{
        summary: data.aiSummary ?? "",
        emotions: data.emotionTags ?? [],
      }}
      from={{
        fromId: data.from?.fromId ?? 0,
        name: data.from?.name ?? "",
        bgColor: data.from?.bgColor ?? "#FFF",
        fontColor: data.from?.fontColor ?? "#000",
      }}
      receivedAt={data.receivedAt}
      folder={data.folder ?? null}
      reply={data.reply}
      onSave={() => {
        console.log("편지 카드 저장");
      }}
      onAddToFolder={(folderId) => {
        setData((prev) => (prev ? { ...prev, folder: { folderId, folderName: '' } } : prev));
      }}
      onRemoveFromFolder={() => {
        setData((prev) => (prev ? { ...prev, folder: null } : prev));
      }}
      onEdit={() => {
        navigate(`/letter/${id}/edit`);
      }}
    />
  );
}


