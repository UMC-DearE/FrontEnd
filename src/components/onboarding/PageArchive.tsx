import { useMemo } from "react";
import AutoCarousel from "./AutoCarousel";
import { onboardingAssets } from "./assets";

export default function PageArchive({ active }: { active: boolean }) {
  const archiveSlides = useMemo(
    () =>
      onboardingAssets.archive.map((src, idx) => (
        <img key={idx} src={src} className="w-[176px]" alt={`archive-${idx + 1}`} draggable={false} />
      )),
    []
  );

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <div className="text-[14px] text-[#9D9D9F] font-medium">
          사진 스티커를 붙이거나 배경을 바꿔
        </div>
        <div className="mt-2 text-[20px] font-bold text-[#141517] leading-snug">
          나만의 아카이브를 만들어보세요
        </div>
      </div>

      <div className="mt-[42px] w-[176px] flex justify-center">
        <AutoCarousel items={archiveSlides} autoplayMs={1800} enabled={active} />
      </div>
    </div>
  );
}
