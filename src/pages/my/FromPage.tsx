import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FromBadge } from '@/components/common/FromBadge';
import type { CreateFrom } from '@/types/from';

type FromItem = CreateFrom & { fromId: number };

export default function FromPage() {
  const location = useLocation();
  const createdFrom = location.state?.createdFrom as FromItem | undefined;
  const navigate = useNavigate();

  const [fromList, setFromList] = useState<FromItem[]>([
    {
      fromId: 1,
      name: '엄마',
      backgroundColor: '#FEEFEF',
      textColor: '#333333',
      letterCount: 5,
    },
        {
          fromId: 2,
          name: '아빠',
          backgroundColor: '#EAF6FF',
          textColor: '#333333',
          letterCount: 3,
        },
  ]);

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
    <div className="p-4 mt-3">
      <div className="flex flex-col gap-4">
        {fromList.length === 0 ? (
          <div className="w-full text-center text-sm text-[#9D9D9F] py-6">
            저장된 목록이 없어요
          </div>
        ) : (
          fromList.map((from) => (
            <div
              key={from.fromId}
              className="flex items-center justify-between border border-[#E6E7E9] rounded-xl p-4 bg-white"
            >
              <FromBadge
                name={from.name}
                backgroundColor={from.backgroundColor}
                textColor={from.textColor}
              />

              <div className="text-sm font-medium text-[#9D9D9F] mr-4">{from.letterCount ?? 0}통의 편지</div>

              <button
                  onClick={() => navigate(`/my/from/${from.fromId}/edit`)}
                  className="text-sm items-center font-normal text-[#9D9D9F] border border-[#C2C4C7] rounded-lg px-[10px] py-[2px]"
                >
                  수정
                </button>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}
