// 초대 링크 가입 환영 바텀 시트

import BottomSheet from './BottomSheet';
import { BottomButton } from './BottomButton';
import Firecracker from '@/assets/bottomSheet/firecracker.svg';

interface InviteWelcomeSheetProps {
  open: boolean;
  onClose: () => void;
  onGoCustomize: () => void;
}

export default function InviteWelcomeSheet({
  open,
  onClose,
  onGoCustomize,
}: InviteWelcomeSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} className="px-[20px]" contentClassName="gap-[32px]">
      <div className="flex w-full flex-col items-center gap-[28px]">
        <div className="flex w-full flex-col items-center gap-[20px]">
          <img src={Firecracker} alt="" className="h-[44px] w-[44px] shrink-0" />

          <div className="flex w-full flex-col gap-[12px] text-center">
            <div className="flex flex-col gap-[4px] text-[18px] font-bold text-[#121212]">
              <p>친구의 초대로</p>
              <p>꾸미기 기능이 열렸어요!</p>
            </div>

            <div className="flex flex-col gap-[8px] text-[14px] font-medium text-[#585A5F]">
              <p>환영해요! 디어리의 모든 꾸미기 기능을</p>
              <p>자유롭게 사용할 수 있어요.</p>
            </div>
          </div>
        </div>

        <BottomButton onClick={onGoCustomize}>홈 화면 꾸미러 가기</BottomButton>

        <button
          type="button"
          onClick={onClose}
          className="w-full cursor-pointer text-center text-[13px] font-medium text-[#CACBD1]"
        >
          나중에 할게요
        </button>
      </div>
    </BottomSheet>
  );
}
