import { onboardingAssets } from './assets';

export default function PageAnalyze() {
  return (
    <div className="flex flex-col items-center w-full min-w-0">
      <div className="text-center w-full">
        <div className="text-[14px] text-[#A1A4AA] font-medium">지금까지 받은 편지들을 모아</div>
        <div className="mt-2 text-[20px] font-bold text-[#141517] leading-snug">
          새로운 나의 모습을 분석해요
        </div>
      </div>

      <div className="mt-11 w-full flex justify-center min-w-0">
        <img
          src={onboardingAssets.analyze}
          alt="새로운 나의 모습을 분석해요"
          draggable={false}
          className="w-full max-w-[300px] h-auto object-contain"
        />
      </div>
    </div>
  );
}