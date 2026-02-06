// 편지함 툴바

import { useMemo, useState } from 'react';
import fromIcon from '@/assets/letterPage/fromIcon.svg';
import dropdownIcon from '@/assets/letterPage/dropdownIcon.svg';
import Dropdown from '@/components/letterBox/Dropdown';
import FromBottomSheet from '@/components/letterBox/FromBottomSheet';
import type { From } from '@/types/from';

type Option = '기본 보기' | '간편 보기';

type ToolBarProps = {
  totalCount: number;
  folderTotalCount: number;
  froms: From[];
  fromCounts?: Record<number, number>;
  selectedFromId: number | 'all';
  onFromSelect: (fromId: number | 'all') => void;
  view: Option;
  onViewChange: (view: Option) => void;
};

export default function ToolBar({
  folderTotalCount,
  froms,
  fromCounts,
  selectedFromId,
  onFromSelect,
  view,
  onViewChange,
}: ToolBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fromSheetOpen, setFromSheetOpen] = useState(false);

  const safeFromCounts = useMemo<Record<number, number>>(() => fromCounts ?? {}, [fromCounts]);

  const selectedFromName = useMemo(() => {
    if (selectedFromId === 'all') return 'From';
    return froms.find((f) => f.fromId === selectedFromId)?.name ?? 'From';
  }, [froms, selectedFromId]);

  const handleSelectFrom = (fromId: number | 'all') => {
    onFromSelect(fromId);
    setFromSheetOpen(false);
  };

  return (
    <>
      <div className="relative flex w-[361px] h-[25px] mt-5 items-center justify-between">
        <div className="text-[14px] font-semibold text-[#141517]">총 {folderTotalCount}통</div>

        <div className="relative flex items-center">
          <button
            type="button"
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setFromSheetOpen(true);
              setDropdownOpen(false);
            }}
          >
            <p className="text-[#9D9D9F] text-[14px] font-medium mr-1">{selectedFromName}</p>
            <img src={fromIcon} alt="from-icon" className="w-[14px] h-[12px] mr-[19px]" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
          >
            <img
              src={dropdownIcon}
              alt="drop-down-icon"
              className="w-[25px] h-[25px] cursor-pointer"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-[29px] z-50">
              <Dropdown
                value={view}
                onSelect={(option) => {
                  onViewChange(option);
                  setDropdownOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {fromSheetOpen && (
        <FromBottomSheet
          froms={froms}
          totalCount={folderTotalCount}
          fromCounts={safeFromCounts}
          selectedId={selectedFromId}
          onSelect={handleSelectFrom}
          onClose={() => setFromSheetOpen(false)}
        />
      )}
    </>
  );
}
