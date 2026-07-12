// 편지 상세 - 폴더로 편지 이동 바텀 시트

import type { Folder } from '@/types/folder';
import allFolderIcon from '@/assets/letterPage/allFolderIcon.svg';
import newFolderIcon from '@/assets/letterPage/newFolderIcon.svg';
import defaultFolderIcon from '@/assets/letterPage/default-folder.svg';
import selectFilledIcon from '@/assets/letter/select-filled.svg';
import selectOutlineIcon from '@/assets/letter/select-outline.svg';

interface Props {
  open: boolean;
  folders: Folder[];
  selectedFolderId: number | null;
  onClose: () => void;
  onSelect: (folderId: number) => void;
  onSelectNone: () => void;
  onCreateFolder: () => void;
}

function SelectRadio({ selected }: { selected: boolean }) {
  return (
    <img
      src={selected ? selectFilledIcon : selectOutlineIcon}
      alt=""
      className="ml-auto h-[20px] w-[20px] shrink-0"
    />
  );
}

export default function FolderSelect({
  open,
  folders,
  selectedFolderId,
  onClose,
  onSelect,
  onSelectNone,
  onCreateFolder,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="absolute inset-0 bg-black/40"
      />

      <div className="relative z-10 flex max-h-[369px] w-full max-w-[440px] flex-col items-center rounded-t-[24px] bg-white px-[20px] pt-[16px] pb-[88px]">
        <div className="h-[5px] w-[36px] shrink-0 rounded-full bg-[#E7E8EB]" />

        <div className="mt-[20px] flex w-full flex-col overflow-y-auto">
          {/* 선택 없음(전체) */}
          <button
            type="button"
            onClick={() => {
              onSelectNone();
              onClose();
            }}
            className="flex w-full items-center gap-[12px] px-[20px] py-[10px]"
          >
            <img src={allFolderIcon} alt="" className="h-[40px] w-[40px] shrink-0" />
            <span className="text-[16px] font-medium text-[#121212]">선택 없음(전체)</span>
            <SelectRadio selected={selectedFolderId == null} />
          </button>

          {/* 폴더 목록 */}
          {folders.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                onSelect(f.id);
                onClose();
              }}
              className="flex w-full items-center gap-[12px] px-[20px] py-[10px]"
            >
              <img
                src={f.imageUrl || defaultFolderIcon}
                alt=""
                className="h-[40px] w-[40px] shrink-0 rounded-[8px] object-cover"
              />
              <span className="truncate text-[16px] font-medium text-[#121212]">{f.name}</span>
              <SelectRadio selected={selectedFolderId === f.id} />
            </button>
          ))}

          {/* 새 폴더 만들기 */}
          {folders.length < 3 && (
            <button
              type="button"
              onClick={onCreateFolder}
              className="flex w-full items-center gap-[12px] px-[20px] py-[10px]"
            >
              <img src={newFolderIcon} alt="" className="h-[40px] w-[40px] shrink-0" />
              <span className="text-[16px] font-medium text-[#121212]">새 폴더 만들기</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
