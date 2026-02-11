// 이미지 크게 보기 뷰어 + 모바일 스와이프, 확대 및 축소

import { useEffect, useRef, useState } from "react";

type ImageSource = File | string;

export function ImageViewer({
  images,
  initialIndex,
  onClose,
}: {
  images: ImageSource[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [url, setUrl] = useState("");

  const [scale, setScale] = useState(1);

  const touchStartX = useRef<number | null>(null);
  const lastDistance = useRef<number | null>(null);

  const source = images[currentIndex];

   useEffect(() => {
    if (typeof source === "string") {
      setUrl(source);
      return;
    }

    const objectUrl = URL.createObjectURL(source);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [source]);

  if (!url) return null;

  type TouchPoint = {
  clientX: number;
  clientY: number;
};

const getDistance = (t1: TouchPoint, t2: TouchPoint) => {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
};

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const t = e.touches.item(0);
      if (!t) return;
      touchStartX.current = t.clientX;
    }

    if (e.touches.length === 2) {
      const t1 = e.touches.item(0);
      const t2 = e.touches.item(1);
      if (!t1 || !t2) return;
      lastDistance.current = getDistance(t1, t2);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && lastDistance.current) {
      const t1 = e.touches.item(0);
      const t2 = e.touches.item(1);
      if (!t1 || !t2) return;

      const newDistance = getDistance(t1, t2);
      const ratio = newDistance / lastDistance.current;

      setScale((prev) =>
        Math.min(Math.max(prev * ratio, 1), 3)
      );

      lastDistance.current = newDistance;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    lastDistance.current = null;

    // 확대 중이면 swipe 막기
    if (scale > 1) {
      touchStartX.current = null;
      return;
    }

    if (touchStartX.current === null) return;

    const t = e.changedTouches.item(0);
    if (!t) return;

    const diff = t.clientX - touchStartX.current;
    const THRESHOLD = 50;

    if (diff > THRESHOLD && currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else if (diff < -THRESHOLD && currentIndex < images.length - 1) {
      setCurrentIndex((i) => i + 1);
    }

    touchStartX.current = null;
  };

  if (!url) return null;

  return (
    <div
      className="absolute inset-0 z-50 bg-black flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full flex justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={url}
          alt="이미지 크게 보기"
          draggable={false}
          className="w-full max-h-[80vh] object-cover select-none transition-transform"
          style={{
            transform: `scale(${scale})`,
          }}
        />
      </div>
    </div>
  );
}

export default ImageViewer;





