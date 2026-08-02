// 편지함 폴더 설정 모달

import BottomSheet from '@/components/common/BottomSheet';

interface FolderSettingSheetProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: 'editFolder' | 'deleteFolder') => void;
}

export default function FolderSettingSheet({ open, onClose, onSelect }: FolderSettingSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="mt-[36px] flex w-full flex-col items-center gap-[40px]">
        <button
          type="button"
          onClick={() => onSelect('editFolder')}
          className="cursor-pointer text-[18px] text-[#141517]"
        >
          폴더 수정
        </button>

        <button
          type="button"
          onClick={() => onSelect('deleteFolder')}
          className="cursor-pointer text-[18px] text-[#FF1D0D]"
        >
          폴더 삭제
        </button>
      </div>
    </BottomSheet>
  );
}
