// 친구 초대 바텀 시트

import BottomSheet from './BottomSheet';
import { BottomButton } from './BottomButton';
import Lock from '@/assets/bottomSheet/Locked.svg';

interface FriendInviteSheetProps {
  open: boolean;
  onClose: () => void;
  onInvite: () => void;
}

export default function FriendInviteSheet({ open, onClose, onInvite }: FriendInviteSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} className="px-[20px]" contentClassName="gap-[32px]">
      <div className="flex w-full flex-col items-center gap-[28px]">
        <div className="flex w-full flex-col items-center gap-[20px]">
          <img src={Lock} alt="" className="h-[44px] w-[44px] shrink-0" />

          <div className="flex w-full flex-col gap-[12px] text-center">
            <div className="flex flex-col gap-[4px] text-[18px] font-bold text-[#121212]">
              <p>친구 초대하고</p>
              <p>나만의 편지함 꾸미기</p>
            </div>

            <div className="flex flex-col gap-[8px] text-[14px] font-medium text-[#585A5F]">
              <p>초대 링크를 통해 1명만 가입해도</p>
              <p>테마·스티커·폰트를 마음껏 이용할 수 있어요!</p>
            </div>
          </div>
        </div>

        <BottomButton onClick={onInvite}>링크 복사하기</BottomButton>

        <button
          type="button"
          onClick={onClose}
          className="w-full cursor-pointer text-center text-[13px] font-medium text-[#CACBD1]"
        >
          아니요 괜찮아요
        </button>
      </div>
    </BottomSheet>
  );
}
