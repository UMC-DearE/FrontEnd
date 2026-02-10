import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FromBadge } from '@/components/common/FromBadge';
import FromEditPanel from '@/components/my/from/FromEditPanel';
import type { From } from '@/types/from';
import { deleteFrom, updateFrom } from '@/api/from';
import useToast from '@/hooks/useToast';
import { useFromList } from '@/hooks/queries/useFromList';

type FromItem = From;

export default function FromPage() {
  const location = useLocation();
  const createdFrom = location.state?.createdFrom as FromItem | undefined;
  const [editingFromId, setEditingFromId] = useState<number | null>(null);
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: fromList = [], isLoading } = useFromList();

  useEffect(() => {
    if (!createdFrom) return;

    queryClient.setQueryData<FromItem[]>(['froms'], (prev = []) => {
      const exists = prev.some((f) => f.fromId === createdFrom.fromId);
      if (exists) return prev;
      return [createdFrom, ...prev];
    });

    window.history.replaceState({}, document.title);
  }, [createdFrom, queryClient]);

  if (isLoading) {
    return (
      <div className="w-full text-center text-sm text-[#9D9D9F] py-6">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-1">
      {fromList.length === 0 ? (
        <div className="w-full text-center text-sm text-[#9D9D9F] py-6">
          저장된 목록이 없어요
        </div>
      ) : (
        fromList.map((from) => (
          <div key={from.fromId}>
            {editingFromId === from.fromId ? (
              <FromEditPanel
                from={from}
                onCancel={() => setEditingFromId(null)}
                onSave={async (updated) => {
                  try {
                    const res = await updateFrom(updated.fromId, {
                      name: updated.name,
                      bgColor: updated.bgColor,
                      fontColor: updated.fontColor,
                    });
                    if (!res.success) {
                      toast.show(res.message || '프롬 수정에 실패했어요.');
                      return;
                    }
                    queryClient.setQueryData<FromItem[]>(['froms'], (prev = []) =>
                      prev.map((f) =>
                        f.fromId === updated.fromId
                          ? {
                              ...f,
                              name: res.data.name,
                              bgColor: res.data.bgColor,
                              fontColor: res.data.fontColor,
                            }
                          : f
                      )
                    );
                    setEditingFromId(null);
                  } catch {
                    toast.show('프롬 수정 중 오류가 발생했어요.');
                  }
                }}
                onDelete={async (id) => {
                  try {
                    const res = await deleteFrom(id);
                    if (!res.success) {
                      toast.show(res.message || '프롬 삭제에 실패했어요.');
                      return;
                    }
                    queryClient.setQueryData<FromItem[]>(['froms'], (prev = []) =>
                      prev.filter((f) => f.fromId !== id)
                    );
                    setEditingFromId(null);
                  } catch {
                    toast.show('프롬 삭제 중 오류가 발생했어요.');
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-between border border-[#E6E7E9] rounded-xl p-4 bg-white">
                <div className="flex items-center gap-3">
                  <FromBadge
                    name={from.name}
                    bgColor={from.bgColor}
                    fontColor={from.fontColor}
                  />
                  <div className="flex items-center text-xs font-medium text-[#9D9D9F]">
                    {from.letterCount ?? 0}통의 편지
                  </div>
                </div>

                <button
                  onClick={() => setEditingFromId(from.fromId)}
                  className="text-sm font-normal text-[#9D9D9F] border border-[#C2C4C7] rounded-lg px-[10px] py-[2px]"
                >
                  수정
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

