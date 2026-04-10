import { useMemo } from "react";
import AutoCarousel from "./AutoCarousel";
import { onboardingAssets } from "./assets";

export default function PageKeep({ active }: { active: boolean }) {
  const keepSlides = useMemo(() => {
    const smallSlideIndexes = new Set([0, 1]);

    return onboardingAssets.keep.map((item, idx) => (
      <div key={idx} className="flex justify-center w-full">
        {typeof item === "string" ? (
          <img
            src={item}
            alt={`keep-${idx + 1}`}
            draggable={false}
            className={
              smallSlideIndexes.has(idx)
                ? "block w-full max-w-[95px] pt-[40px] h-auto object-contain"
                : "block w-full max-w-[280px] h-auto object-contain"
            }
          />
        ) : (
          <div className={smallSlideIndexes.has(idx) ? "w-full max-w-[95px] pt-[40px]" : "w-full max-w-[280px]"}>
            {item}
          </div>
        )}
      </div>
    ));
    }, []);

  return (
    <div className="flex flex-col items-center w-full min-w-0">
      <div className="text-center w-full">
        <div className="text-[14px] text-[#9D9D9F] font-medium">
          이미지 또는 텍스트를 선택하고
        </div>
        <div className="mt-2 text-[20px] font-bold text-[#141517] leading-snug">
          소중한 편지들을 보관해 보세요
        </div>
      </div>

      <div className="mt-[92px] w-full flex justify-center min-w-0">
        <div className="w-full max-w-[280px] min-w-0">
          <AutoCarousel items={keepSlides} autoplayMs={1800} enabled={active} />
        </div>
      </div>
    </div>
  );
}
