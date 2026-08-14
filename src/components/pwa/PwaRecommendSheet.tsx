// PWA 홈 화면 추가 권장 바텀 시트

import deareIcon from '@/assets/pwa/deareIcon.svg';
import exportIcon from '@/assets/pwa/exportIcon.svg';

type PwaProps = {
  onClose: () => void;
};

export default function PwaRecommendSheet({ onClose }: PwaProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/40"
      />

      <div className="relative z-10 w-full max-w-[440px] rounded-t-[24px] bg-white px-[20px] pt-[16px] pb-[60px] shadow-[0_0_12px_0_rgba(0,0,0,0.10)]">
        <div className="flex w-full flex-col items-center gap-[32px]">
          <div className="h-[5px] w-[36px] shrink-0 rounded-full bg-[#E7E8EB]" />

          <div className="flex w-full flex-col items-center gap-[28px]">
            <div className="flex w-full flex-col items-center gap-[20px]">
              <img src={deareIcon} alt="deare-icon" className="h-[60px] w-[60px] rounded-[8px]" />

              <div className="flex w-full flex-col items-center gap-[8px] text-center text-[14px] font-medium text-[#585A5F]">
                <p className="flex items-end gap-[4px]">
                  하단
                  <img src={exportIcon} alt="export-icon" className="h-[17.5px] w-[15px]" />
                  버튼을 눌러
                </p>

                <p>
                  <span className="font-bold text-[#121212]">홈 화면에 추가하기</span>를 선택하면
                </p>

                <p>터치 한 번으로 편하게 접속할 수 있어요</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-[13px] font-medium text-[#CACBD1] underline decoration-[#CACBD1] underline-offset-[3px]"
            >
              오늘은 이대로 볼게요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
