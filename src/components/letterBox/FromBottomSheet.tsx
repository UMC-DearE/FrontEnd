import { useEffect, useMemo, useState } from 'react';
import type { LetterFrom } from '@/types/letter';

type GetFomsResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    froms: Array<{
      fromId: number;
      name: string;
      bgColor: string;
      fontColor: string;
      letterCount: number;
    }>;
  };
};

export type FromBottomSheetProps = {
  selectedId: number | 'all';
  onSelect: (fromId: number | 'all') => void;
  onClose: () => void;
};

export default function FromBottomSheet({ selectedId, onSelect, onClose }: FromBottomSheetProps) {
  const [items, setItems] = useState<GetFomsResponse['data']['froms']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const res = await fetch('/foms', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });

        if (!res.ok) throw new Error(`GET /foms failed: ${res.status}`);

        const json = (await res.json()) as GetFomsResponse;
        if (!json.success) throw new Error(json.message);

        if (mounted) setItems(json.data.froms ?? []);
      } catch {
        if (mounted) setHasError(true);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const froms: LetterFrom[] = useMemo(
    () =>
      items.map((v) => ({
        fromId: v.fromId,
        name: v.name,
        bgColor: v.bgColor,
        fontColor: v.fontColor,
      })),
    [items]
  );

  const fromCounts = useMemo(() => {
    const map: Record<number, number> = {};
    for (const v of items) map[v.fromId] = v.letterCount ?? 0;
    return map;
  }, [items]);

  const totalCount = useMemo(
    () => items.reduce((acc, v) => acc + (v.letterCount ?? 0), 0),
    [items]
  );

  if (isLoading || hasError) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-[393px] min-h-screen overflow-hidden">
        <button type="button" onClick={onClose} className="absolute inset-0 bg-black/40" />
        <div className="fixed bottom-0 left-1/2 w-[393px] h-[260px] -translate-x-1/2 rounded-t-[17px] bg-white">
          <div className="flex h-full flex-col">
            <p className="mt-[21px] text-center text-[18px] font-semibold text-[#141517]">
              From 선택
            </p>
            <div className="mt-[14px] flex-1 overflow-y-auto px-[24px] pb-4 no-scrollbar">
              <div
                className={`mx-auto rounded-[8px] transition-all ${selectedId === 'all' ? 'bg-[#FFEEE8] w-full' : 'bg-white w-full'}`}
              >
                <button
                  type="button"
                  onClick={() => onSelect('all')}
                  className="cursor-pointer flex h-[44px] w-full items-center justify-between px-3"
                >
                  <p
                    className={`text-[16px] ${selectedId === 'all' ? 'text-[#FF5F2F] font-semibold' : 'text-[#141517]'}`}
                  >
                    모든 편지 보기
                  </p>
                  <p
                    className={`text-[16px] ${selectedId === 'all' ? 'text-[#FF5F2F] font-bold' : 'text-[#45454599]'}`}
                  >
                    {totalCount}
                  </p>
                </button>
              </div>
              <div className="mt-2 flex flex-col gap-[8px]">
                {froms.map((from) => {
                  const isSelected = selectedId === from.fromId;
                  return (
                    <button
                      key={from.fromId}
                      type="button"
                      onClick={() => onSelect(from.fromId)}
                      className={`cursor-pointer flex h-[44px] w-full items-center justify-between rounded-[8px] px-3 transition-all ${isSelected ? 'bg-[#FFEEE8]' : 'bg-white'}`}
                    >
                      <p
                        className={`text-[16px] ${isSelected ? 'text-[#FF5F2F] font-semibold' : 'text-[#141517]'}`}
                      >
                        {from.name}
                      </p>
                      <p
                        className={`text-[16px] ${isSelected ? 'text-[#FF5F2F] font-bold' : 'text-[#45454599]'}`}
                      >
                        {fromCounts[from.fromId] ?? 0}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
