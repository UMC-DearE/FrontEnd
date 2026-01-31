import { useEffect, useState } from "react";

type Props = {
  file?: File;
  onClick?: () => void;
};

export default function LetterThumbnail({ file, onClick }: Props) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!file || !url) {
    return (
      <div
        className="w-[44px] h-[44px] rounded-sm bg-gray-200"
        onClick={onClick}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[44px] h-[44px] rounded-sm overflow-hidden p-0"
      aria-label="이미지 보기"
    >
      <img
        src={url}
        alt="썸네일"
        className="w-full h-full object-cover select-none"
        draggable={false}
      />
    </button>
  );
}

