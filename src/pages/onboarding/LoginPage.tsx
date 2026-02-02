import { useMemo, useRef, useState } from "react";
import { onboardingAssets } from "@/components/onboarding/assets";
import PageKeep from "@/components/onboarding/PageKeep";
import PageAI from "@/components/onboarding/PageAI";
import PageArchive from "@/components/onboarding/PageArchive";

export default function LoginPage() {
  const [pageIdx, setPageIdx] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);

  const startX = useRef<number | null>(null);
  const deltaX = useRef<number>(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    deltaX.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current == null) return;
    deltaX.current = e.clientX - startX.current;
  };

  const onPointerUp = () => {
    if (startX.current == null) return;

    const dx = deltaX.current;
    const threshold = 60;

    if (dx <= -threshold) {
      setPageIdx((p) => {
        const next = p < 2 ? p + 1 : p;
        if (next !== p) setHasSwiped(true);
        return next;
      });
    } else if (dx >= threshold) {
      setPageIdx((p) => {
        const next = p > 0 ? p - 1 : p;
        if (next !== p) setHasSwiped(true);
        return next;
      });
    }

    startX.current = null;
    deltaX.current = 0;
  };

  const activeIdx = hasSwiped ? pageIdx : 0;

  const pages = useMemo(
    () => [
      { id: "keep", node: <PageKeep active={activeIdx === 0} /> },
      { id: "ai", node: <PageAI active={activeIdx === 1} /> },
      { id: "archive", node: <PageArchive active={activeIdx === 2} /> },
    ],
    [activeIdx]
  );
  return (
    <div>
      <div className="pt-4 pb-[59px] flex flex-col">
        <div
          style={{ touchAction: "pan-y" }}
          className="relative mt-10 overflow-hidden touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${pageIdx * 100}%)` }}
          >
            {pages.map((p) => (
              <div key={p.id} className="w-full shrink-0">
                {p.node}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[42px] mb-[85px] flex justify-center gap-[10px]">
          {pages.map((_, i) => (
            <span
              key={i}
              className={`h-[6px] w-[6px] rounded-full transition-all ${
                i === pageIdx ? "bg-[#FF5F2F]" : "bg-[#E6E7E9]"
              }`}
            />
          ))}
        </div>

        <div className="shrink-0 space-y-4">
          <button
            type="button"
            className="w-full rounded-xl bg-[#FEE500] flex items-center justify-center active:scale-[0.99]"
          >
            <img src={onboardingAssets.KakaoIcon} alt="kakao" draggable={false} />
          </button>

          <button
            type="button"
            className="w-full rounded-xl border border-gray-200 bg-white flex items-center justify-center active:scale-[0.99]"
          >
            <img src={onboardingAssets.GoogleIcon} alt="google" draggable={false} />
          </button>
        </div>
      </div>
    </div>
  );
}