import { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import { FromBadge } from '@/components/common/FromBadge';
import FromEditPanel from '@/components/my/from/FromEditPanel';
import type { From } from '@/types/from';

type FromItem = From;

export default function FromPage() {
  const location = useLocation();
  const createdFrom = location.state?.createdFrom as FromItem | undefined;
  const [editingFromId, setEditingFromId] = useState<number | null>(null);

  const [fromList, setFromList] = useState<FromItem[]>([
    {
      fromId: 1,
      name: '엄마',
      bgColor: '#FEEFEF',
      fontColor: '#333333',
      letterCount: 5,
    },
    {
      fromId: 2,
      name: '긴 이름 테스트',
      bgColor: '#EAF6FF',
      fontColor: '#333333',
      letterCount: 3,
    },
  ]); // 프롬 목록 api 호출

  useEffect(() => {
    if (!createdFrom) return;

    setFromList((prev) => {
      const exists = prev.some((f) => f.fromId === createdFrom.fromId);
      if (exists) return prev;
      return [createdFrom, ...prev];
    });

    window.history.replaceState({}, document.title);
  }, [createdFrom]);

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
              onSave={(updated) => {
                setFromList((prev) =>
                  prev.map((f) =>
                    f.fromId === updated.fromId ? updated : f
                  )
                ); // 프롬 수정 api 호출
                setEditingFromId(null);
              }}
              onDelete={(id) => {
                setFromList((prev) => prev.filter((f) => f.fromId !== id));
                setEditingFromId(null);
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

