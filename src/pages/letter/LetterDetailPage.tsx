import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LetterDetailSection from "@/components/letter/LetterDetailSection";
import LetterDetailSkeleton from "@/components/skeleton/LetterDetailSkeleton";
import useToast from "@/hooks/useToast";
import { useLetterDetail } from "@/hooks/queries/useLetterDetail";
import { useDeleteLetter } from "@/hooks/mutations/useDeleteLetter";
import { useLetterFolder } from "@/hooks/mutations/useLetterFolder";

export default function LetterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const letterId = Number(id);

  const { data, isLoading, isError } = useLetterDetail(letterId);
  const deleteMutation = useDeleteLetter();
  const { addFolderMutation, removeFolderMutation } = useLetterFolder(letterId);

  if (!id || Number.isNaN(letterId)) {
    return <div className="p-4 text-red-500">잘못된 편지 ID입니다.</div>;
  }

  if (isLoading) return <LetterDetailSkeleton />;
  if (isError || !data || !data.success) {
    return <div className="p-4 text-red-500">편지를 불러오지 못했어요.</div>;
  }

  const detail = data.data;

  return (
    <LetterDetailSection
      letterId={letterId}
      isLiked={detail.isLiked ?? false}
      content={detail.content}
      aiResult={{
        summary: detail.aiSummary ?? "",
        emotions: detail.emotionTags ?? [],
      }}
      from={{
        fromId: detail.from?.fromId ?? 0,
        name: detail.from?.name ?? "",
        bgColor: detail.from?.bgColor ?? "#FFF",
        fontColor: detail.from?.fontColor ?? "#000",
      }}
      receivedAt={detail.receivedAt}
      folder={detail.folder ?? null}
      reply={detail.reply}
      onSave={() => {
        console.log("편지 카드 저장");
      }}

      onAddToFolder={async (folderId) => {
        if (addFolderMutation.isPending || detail.folder) return;
        await addFolderMutation.mutateAsync(folderId);
      }}

      onRemoveFromFolder={async () => {
        if (removeFolderMutation.isPending || !detail.folder) return;
        await removeFolderMutation.mutateAsync(detail.folder.folderId);
      }}

      onEdit={() => {
        navigate(`/letter/${letterId}/edit`, {
          state: {
            imageUrls: detail.imageUrls ?? [],
          },
        });
      }}

      onDeleteLetter={async () => {
        try {
          await deleteMutation.mutateAsync(letterId);
          navigate("/letter", { replace: true });
        } catch {
          toast.show("편지 삭제 중 오류가 발생했어요.");
        }
      }}
    />
  );
}


