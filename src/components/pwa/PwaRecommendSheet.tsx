import deareIcon from '@/assets/pwa/deareIcon.svg';
import exportIcon from '@/assets/pwa/exportIcon.svg';

type PwaProps = {
  onClose: () => void;
};

export default function PwaRecommendSheet({ onClose }: PwaProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="relative w-full max-w-[440px] min-h-screen bg-black/40 overflow-hidden cursor-pointer"
        onClick={onClose}
      />
      <div className="pointer-events-auto fixed bottom-0 left-1/2 w-full max-w-[440px] -translate-x-1/2 h-[284px] bg-[#FFFFFF] rounded-t-[17px]">
        <div className="flex flex-col items-center justify-center px-[89px] py-[30px] text-[14px] font-medium">
          <img src={deareIcon} alt="deare-icon" className="w-[60px] h-[60px]" />

          <div className="flex flex-col items-center gap-2 mt-5">
            <div className="flex items-center gap-1">
              하단
              <img src={exportIcon} alt="export-icon" className="w-[15px] h-[17.5px]" />
              버튼을 눌러
            </div>

            <div>
              <span className="font-bold">홈 화면에 추가하기</span>를 선택하면
            </div>

            <div>터치 한 번으로 편하게 접속할 수 있어요</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex justify-center items-center w-full text-[13px] font-medium text-[#CACBD1] gap-[28px] underline decoration-[#CACBD1] underline-offset-3"
        >
          오늘은 이대로 볼게요
        </button>
      </div>
    </div>
  );
}
