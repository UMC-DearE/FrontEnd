import stickerIcon from '@/assets/homePage/stickerIcon.svg';
import bgIcon from '@/assets/homePage/bgIcon.svg';

export default function CustomResetSheet() {
  return (
    <div className="pointer-events-auto fixed bottom-0 left-1/2 h-[277px] w-full max-w-[440px] -translate-x-1/2 rounded-t-[17px] bg-white">
      <div className="flex flex-col justify-center items-center mt-[40px] gap-[12px] text-[16px] text-[#585A5F] px-4">
        <button className="flex items-center w-full h-[48px] bg-[#EBEDF080] rounded-[12px] gap-[8px] px-[20px]">
          <img className="w-[24px] h-[24px]" src={stickerIcon} />
          스티커만 초기화
        </button>
        <button className="flex items-center w-full h-[48px] bg-[#EBEDF080] rounded-[12px] gap-[8px] px-[20px]">
          <img className="w-[25px] h-[25px]" src={bgIcon} />
          배경색만 초기화
        </button>
        <button className="mt-4 w-full h-[52px] bg-[#FFEEE8] text-[#FF5F2F] font-semibold rounded-[12px]">
          전부 초기화
        </button>
      </div>
    </div>
  );
}
