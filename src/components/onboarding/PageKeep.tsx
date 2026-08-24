import { onboardingAssets } from './assets';

export default function PageKeep() {
  return (
    <div className="flex flex-col items-center w-full min-w-0">
      <div className="text-center w-full">
        <div className="text-[14px] text-[#A1A4AA] font-medium">이미지 또는 텍스트를 선택해</div>
        <div className="mt-2 text-[20px] font-bold text-[#141517] leading-snug">
          소중한 편지들을 보관해요
        </div>
      </div>

      <div className="mt-[52px] w-full flex justify-center min-w-0">
        <img
          src={onboardingAssets.keep}
          alt="소중한 편지들을 보관해요"
          draggable={false}
          className="w-full max-w-[288px] h-auto object-contain"
        />
      </div>
    </div>
  );
}