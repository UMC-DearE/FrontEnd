// 홈 프로필 설정 바텀 시트

import BottomSheet from '@/components/common/BottomSheet';

interface ProfileSettingSheetProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: 'editProfile' | 'customHome') => void;
}

export default function ProfileSettingSheet({ open, onClose, onSelect }: ProfileSettingSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} className="px-[20px]" contentClassName="gap-[12px]">
      <div className="flex w-full flex-col">
        <button
          type="button"
          onClick={() => onSelect('editProfile')}
          className="flex h-[60px] w-full cursor-pointer items-center justify-center text-[16px] font-medium text-[#121212]"
        >
          프로필 수정
        </button>

        <button
          type="button"
          onClick={() => onSelect('customHome')}
          className="flex h-[56px] w-full cursor-pointer items-center justify-center text-[16px] font-medium text-[#121212]"
        >
          홈 꾸미기
        </button>
      </div>
    </BottomSheet>
  );
}
