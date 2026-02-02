import { useEffect, useRef, useState } from "react";

export default function AutoCarousel({
  items,
  autoplayMs = 2200,
  enabled = true,
}: {
  items: React.ReactNode[];
  autoplayMs?: number;
  enabled?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const timerRef = useRef<number | null>(null);

  const hasItems = items.length > 0;
  const slides = hasItems ? [...items, items[0]] : [];
  const TRANSITION_MS = 500;

  // autoplay (외부 시스템: timer)
  useEffect(() => {
    if (!enabled || !hasItems) return;

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIdx((prev) => prev + 1);
    }, autoplayMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [enabled, autoplayMs, hasItems]);

  // loop reset (타이머/애니메이션 동기화 → 허용)
  useEffect(() => {
    if (!enabled || !hasItems) return;
    if (idx !== items.length) return;

    const t = setTimeout(() => {
      setEnableTransition(false);
      setIdx(0);
    }, TRANSITION_MS);

    return () => clearTimeout(t);
  }, [enabled, idx, items.length, hasItems]);

  useEffect(() => {
    if (!enabled || !hasItems) return;
    if (!enableTransition && idx === 0) {
      requestAnimationFrame(() => setEnableTransition(true));
    }
  }, [enabled, enableTransition, idx, hasItems]);

  // enabled가 false면 상태를 "리셋하지 말고" 파생값으로 사용
  const renderIdx = enabled ? idx : 0;
  const renderTransition = enabled ? enableTransition : true;

  if (!hasItems) return null;

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex ${
          renderTransition
            ? "transition-transform duration-500 ease-out"
            : ""
        }`}
        style={{ transform: `translateX(-${renderIdx * 100}%)` }}
      >
        {slides.map((node, i) => (
          <div key={i} className="w-full shrink-0">
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}
