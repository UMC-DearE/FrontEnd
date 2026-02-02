import { useMemo } from "react";
import AutoCarousel from "./AutoCarousel";
import { onboardingAssets } from "./assets";

export default function PageAI({ active }: { active: boolean }) {
  const aiCards = useMemo(
    () =>
      onboardingAssets.ai.map((src, idx) => (
        <img key={idx} src={src} className="w-full" alt={`ai-${idx + 1}`} draggable={false} />
      )),
    []
  );

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <div className="text-[14px] text-[#9D9D9F] font-medium">
          그날의 감정, 진심 등을
        </div>
        <div className="mt-2 text-[20px] font-bold text-[#141517] leading-snug">
          AI가 한 줄로 정리해드려요
        </div>
      </div>

      <div className="mt-8">
        <img src={onboardingAssets.RobotIcon} alt="robot" draggable={false} />
      </div>

      <div className="mt-[13px] w-full flex justify-center">
        <div className="w-[308px] h-[69px]">
          <AutoCarousel
            items={aiCards.map((card, i) => (
              <div key={i}>
                {card}
              </div>
            ))}
            autoplayMs={1800}
            enabled={active}
          />
        </div>
      </div>
    </div>
  );
}
