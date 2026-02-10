// 편지함 From 모달

import type { LetterFrom } from '@/types/letter';

export type FromBottomSheetProps = {
  froms: LetterFrom[];
  totalCount: number;
  fromCounts: Record<number, number>;
  selectedId: number | 'all';
  onSelect: (fromId: number | 'all') => void;
  onClose: () => void;
};

export default function FromBottomSheet({
  froms,
  totalCount,
  fromCounts,
  selectedId,
  onSelect,
  onClose,
}: FromBottomSheetProps) {
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
