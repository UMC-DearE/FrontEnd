import { onboardingAssets } from './assets';

export default function PageAI() {
  return (
    <div className="flex flex-col items-center w-full min-w-0">
      <div className="text-center w-full">
        <div className="text-[14px] text-[#A1A4AA] font-medium">AI가 읽어주는 다정한 마음</div>
        <div className="mt-2 text-[20px] font-bold text-[#141517] leading-snug">
          편지 내용을 한 눈에 요약해요
        </div>
      </div>

      <div className="mt-10 w-full flex justify-center min-w-0">
        <img
          src={onboardingAssets.ai}
          alt="편지 내용을 한 눈에 요약해요"
          draggable={false}
          className="w-full max-w-[296px] h-auto object-contain"
        />
      </div>
    </div>
  );
}