// 이미지 크게 보기 오버레이 모달, 단순 뷰어 + 모바일 스와이프

import { useEffect, useRef, useState } from "react";

export function ImageViewer({
  images,
  initialIndex,
  onClose,
}: {
  images: File[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [url, setUrl] = useState("");

  const touchStartX = useRef<number | null>(null);

  const file = images[currentIndex];

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStartX.current;

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
      className="absolute inset-0 z-50 bg-black/90
                 flex items-center justify-center"
      onClick={onClose}
      onPointerDown={(e) => e.stopPropagation()}
>
      <div
        className="relative w-full flex justify-center"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={url}
          alt="이미지 크게 보기"
          className="
            w-full
            h-auto
            max-h-[80vh]
            object-contain
            select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
export default ImageViewer;




