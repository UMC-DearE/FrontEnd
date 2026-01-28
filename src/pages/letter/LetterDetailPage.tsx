import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LetterDetailSection from "@/components/letter/LetterDetailSection";
import { getMockLetterDetail } from "@/mocks/mockLetterDetail";
import type { LetterDetailData } from "@/types/letter";                                     

export default function LetterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LetterDetailData | null>(null);
  

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
      } catch {
        setError("편지 조회 중 오류가 발생했습니다.");
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
      content={data.content}
      aiResult={{
        letterId: Number(id),
        summary: data.aiSummary ?? "",
        emotions: data.emotions ?? [],
      }}
      from={{
        name: data.fromName ?? "",
        backgroundColor: data.fromBgColor ?? "#FFF",
        textColor: data.fromFontColor ?? "#000",
      }}
      createdAt={data.createdAt}
      inFolder={data.inFolder}
      folderName={data.folderName}
      onAddToFolder={(folderId) => {
        setData((prev) => (prev ? { ...prev, inFolder: true, folderId } : prev));
      }}
      onRemoveFromFolder={() => {
        setData((prev) => (prev ? { ...prev, inFolder: false, folderId: null } : prev));
      }}
      reply={data.reply}
      onSave={() => {
        console.log("편지 카드 저장");
      }}
    />
  );
}

