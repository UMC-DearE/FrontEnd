// 편지함 편지 카드 기본 보기

import heartOutlineIcon from '@/assets/letterPage/heart-outline.svg';
import heartFillIcon from '@/assets/letterPage/heart-filled.svg';
import { useEffect, useRef, useState } from 'react';

type LetterCardDefaultProps = {
  content: string;
  isLiked: boolean;
  receiveAt: string;
  fromName: string;
  fromBgColor: string;
  fromFontColor: string;
};

export default function LetterCardDefault({
  content,
  isLiked,
  receiveAt,
  fromName,
  fromBgColor,
  fromFontColor,
}: LetterCardDefaultProps) {
  const [liked, setLiked] = useState(isLiked);
  const [isTwoLine, setIsTwoLine] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const lineHeight = 20;
    setIsTwoLine(textRef.current.scrollHeight > lineHeight + 1);
  }, [content]);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  return (
    <div className="w-[361px]">
      <div
        className={`rounded-lg bg-white px-3 py-3 ${
          isTwoLine ? 'h-[121px]' : 'h-[100px]'
        } flex flex-col`}
      >
        <div className="flex justify-between">
          <div className="text-[#C2C4C7] font-medium text-[12px]">{receiveAt}</div>
          <button
            type="button"
            onClick={() => setLiked((prev) => !prev)}
            className="w-[13px] h-4 cursor-pointer"
          >
            <img src={liked ? heartFillIcon : heartOutlineIcon} alt="heart-icon" />
          </button>
        </div>

        <div className="flex-1 flex items-center">
          <p
            ref={textRef}
            className="mx-auto w-[337px] font-medium text-[14px] leading-[20px] tracking-[-0.01em] line-clamp-2 text-[#555557]"
          >
            {content}
          </p>
        </div>

        <div
          className="flex h-6 w-[45px] items-center justify-center rounded-[6px]"
          style={{ backgroundColor: fromBgColor, color: fromFontColor }}
        >
          <p className="font-medium text-[13px] truncate">{fromName}</p>
        </div>
      </div>
    </div>
  );
}
