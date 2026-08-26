import BottomSheet from './BottomSheet';
import Firecracker from '@/assets/bottomSheet/firecracker.svg';

interface InviteUnlockSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function InviteUnlockSheet({ open, onClose }: InviteUnlockSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} className="px-[20px]" contentClassName="gap-[32px]">
      <div className="flex w-full flex-col items-center gap-[20px] pb-[40px]">
        <img src={Firecracker} alt="" className="h-[44px] w-[44px] shrink-0" />

        <div className="flex w-full flex-col gap-[12px] text-center">
          <div className="flex flex-col gap-[4px] text-[18px] font-bold text-[#121212]">
            <p>친구의 가입으로</p>
            <p>꾸미기 기능이 열렸어요!</p>
          </div>

          <div className="flex flex-col gap-[8px] text-[14px] font-medium text-[#585A5F]">
            <p>환영해요! 디어리의 모든 꾸미기 기능을</p>
            <p>자유롭게 사용할 수 있어요.</p>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
