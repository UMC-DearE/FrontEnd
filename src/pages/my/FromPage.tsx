import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { FromBadge } from '@/components/common/FromBadge';
import FromEditSheet from '@/components/my/from/FromEditSheet';

import type { From } from '@/types/from';

import useToast from '@/hooks/useToast';
import { useFromList } from '@/hooks/queries/useFromList';
import { useUpdateFrom } from '@/hooks/mutations/useUpdateFrom';
import { useDeleteFrom } from '@/hooks/mutations/useDeleteFrom';

type FromItem = From;

export default function FromPage() {
  const location = useLocation();
  const createdFrom = location.state?.createdFrom as FromItem | undefined;
  const [editingFrom, setEditingFrom] = useState<FromItem | null>(null);

  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: fromList = [], isLoading } = useFromList();

  const updateFromMutation = useUpdateFrom();
  const deleteFromMutation = useDeleteFrom();

  useEffect(() => {
    if (!createdFrom) return;

    queryClient.setQueryData<FromItem[]>(['froms'], (prev = []) => {
      const exists = prev.some((f) => f.fromId === createdFrom.fromId);

      if (exists) return prev;

      return [createdFrom, ...prev];
    });

    window.history.replaceState({}, document.title);
  }, [createdFrom, queryClient]);

  const handleSave = async (updated: FromItem) => {
    const normalizeFromName = (name: string) =>
      name.trim().replace(/\s+/g, ' ').toLocaleLowerCase();

    const trimmedName = updated.name.trim();

    const isDuplicate = fromList.some(
      (item) =>
        item.fromId !== updated.fromId &&
        normalizeFromName(item.name) === normalizeFromName(trimmedName)
    );

    if (isDuplicate) {
      toast.show('같은 이름의 프롬이 이미 있어요');
      return;
    }

    try {
      await updateFromMutation.mutateAsync({
        fromId: updated.fromId,
        payload: {
          name: trimmedName,
          bgColor: updated.bgColor,
          fontColor: updated.fontColor,
        },
      });

      setEditingFrom(null);
    } catch {
      toast.show('프롬 수정 중 오류가 발생했어요.');
    }
  };

  const handleDelete = async (fromId: number) => {
    try {
      await deleteFromMutation.mutateAsync(fromId);
      setEditingFrom(null);
    } catch {
      toast.show('프롬 삭제 중 오류가 발생했어요.');
    }
  };

  if (isLoading) {
    return <div className="w-full py-6 text-center text-sm text-[#A1A4AA]">불러오는 중...</div>;
  }

  return (
    <>
      <div className="mt-1 mb-4 flex flex-col gap-4">
        {fromList.length === 0 ? (
          <div className="w-full py-6 text-center text-sm text-[#A1A4AA]">저장된 목록이 없어요</div>
        ) : (
          fromList.map((from) => (
            <div
              key={from.fromId}
              className="flex items-center justify-between rounded-xl bg-white px-4 py-5 shadow-[0_0_4px_0_rgba(231,232,235,0.50)]"
            >
              <div className="flex items-center gap-3">
                <FromBadge
                  name={from.name}
                  size="lg"
                  bgColor={from.bgColor}
                  fontColor={from.fontColor}
                />

                <div className="flex items-center text-sm font-medium text-[#A1A4AA]">
                  {from.letterCount ?? 0}통의 편지
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingFrom(from)}
                className="rounded-lg border border-[#CACBD1] bg-[#F7F8F9] px-[12px] py-[5px] text-[13px] font-medium text-[#A1A4AA]"
              >
                수정
              </button>
            </div>
          ))
        )}
      </div>

      <FromEditSheet
        open={editingFrom !== null}
        from={editingFrom}
        onClose={() => setEditingFrom(null)}
        onSave={handleSave}
        onDelete={handleDelete}
        isSaving={updateFromMutation.isPending}
      />
    </>
  );
}
