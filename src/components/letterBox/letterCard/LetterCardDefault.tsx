// 편지함 편지 카드 기본 보기

import heartOutlineIcon from '@/assets/letterPage/heart-outline.svg';
import heartFillIcon from '@/assets/letterPage/heart-filled.svg';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useToggleLetterLike } from '@/hooks/mutations/useToggleLetterLike';
import { FromBadge } from '@/components/common/FromBadge';
import type { From } from '@/types/from';

type LetterCardDefaultProps = {
  letterId: number;
  content: string;
  isLiked: boolean;
  receivedAt: string;
  from: From | null;
};

const safeColor = (v?: string, fallback = '#EDEDED') => {
  if (!v) return fallback;
  const t = v.trim();
  const withHash = t.startsWith('#') ? t : `#${t}`;
  return /^#[0-9A-Fa-f]{6}$/.test(withHash) ? withHash : fallback;
};

export default function LetterCardDefault({
  letterId,
  content,
  isLiked,
  receivedAt,
  from,
}: LetterCardDefaultProps) {
  const [liked, setLiked] = useState(isLiked);
  const [isTwoLine, setIsTwoLine] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const toggleLike = useToggleLetterLike(letterId);

  useEffect(() => {
    if (!textRef.current) return;
    const lineHeight = 20;
    setIsTwoLine(textRef.current.scrollHeight > lineHeight + 1);
  }, [content]);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const onClickLike = () => {
    const next = !liked;
    setLiked(next);
    toggleLike.mutate(next, {
      onError: () => setLiked((cur) => !cur),
    });
  };

  const bgColor = safeColor(from?.bgColor, '#EDEDED');
  const fontColor = safeColor(from?.fontColor, '#555557');
  const fromName = from?.name ?? '-';
  const displayDate = receivedAt && receivedAt.trim().length > 0 ? receivedAt : '-';

  return (
    <div className="w-full shadow-[0_0_4px_0_rgba(217,217,217,0.5)] rounded-lg">
      <div
        className={`rounded-lg bg-white px-3 py-3 ${isTwoLine ? 'h-[121px]' : 'h-[100px]'} flex flex-col`}
      >
        <div className="flex justify-between">
          <div className="text-[#C2C4C7] font-medium text-[12px]">{displayDate}</div>
          <button
            type="button"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onClickLike();
            }}
            disabled={toggleLike.isPending}
            className="w-[13px] h-4 cursor-pointer disabled:opacity-50"
          >
            <img src={liked ? heartFillIcon : heartOutlineIcon} alt="heart-icon" />
          </button>
        </div>

        <div className="flex-1 flex items-center">
          <p
            ref={textRef}
            className="mx-auto w-full font-medium text-[14px] leading-[20px] tracking-[-0.01em] line-clamp-2 break-all text-[#555557]"
          >
            {content}
          </p>
        </div>

        <div className="mt-1 flex justify-start">
          <FromBadge name={fromName} bgColor={bgColor} fontColor={fontColor} size="md" />
        </div>
      </div>
    </div>
  );
}
