// 이미지 크게 보기 오버레이 모달, 단순 뷰어

import { useEffect, useState } from "react";

export function ImageViewer({
  file,
  onClose,
}: {
  file: File;
  onClose: () => void;
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!url) return null;

  return (
    <div
      className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>

      <div className="relative w-full" onClick={(e) => e.stopPropagation()}>

        <img
          src={url}
          alt="이미지 크게 보기"
          className="
          w-full
          h-auto
          max-h-[80vh]
          object-contain"
        />
      </div>
    </div>
  );
}



