import { useEffect, useState } from "react";

type ImageSource = File | string;

type Props = {
  source?: ImageSource;
  onClick?: () => void;
};

export default function LetterThumbnail({ source, onClick }: Props) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!source) {
      setUrl(null);
      return;
    }

    if (typeof source === "string") {
      setUrl(source);
      return;
    }

    const objectUrl = URL.createObjectURL(source);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [source]);

  if (!url) {
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
      className="w-[44px] h-[44px] rounded-sm overflow-hidden bg-gray-200"
    >
      <img
        key={url}
        src={url}
        alt=""
        className="w-full h-full object-cover"
        draggable={false}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </button>
  );
}


