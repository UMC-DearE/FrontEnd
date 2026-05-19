// 편지함 편지 카드 기본 보기

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useToggleLetterLike } from '@/hooks/mutations/useToggleLetterLike';
import { FromBadge } from '@/components/common/FromBadge';
import type { From } from '@/types/from';
import heartOuline from '@/assets/letterPage/heart-outline.svg';
import heartFill from '@/assets/letterPage/heart-filled.svg';
import selectOutline from '@/assets/letter/select-outline.svg';
import selectFilled from '@/assets/letter/select-filled.svg';

export type LetterCardMode = 'view' | 'select';

type LetterCardDefaultProps = {
  letterId: number;
  content: string;
  isLiked: boolean;
  receivedAt: string;
  from: From | null;
  searchQuery?: string;
  mode?: LetterCardMode;
  selected?: boolean;
  onSelectToggle?: () => void;
  onLikeToggle?: (nextLiked: boolean) => void;
};

const safeColor = (v?: string, fallback = '#EDEDED') => {
  if (!v) return fallback;
  const t = v.trim();
  const withHash = t.startsWith('#') ? t : `#${t}`;
  return /^#[0-9A-Fa-f]{6}$/.test(withHash) ? withHash : fallback;
};

function getContextSnippet(content: string, query: string): string {
  const lower = content.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return content;
  const start = Math.max(0, idx - 20);
  return (start > 0 ? '...' : '') + content.slice(start);
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;

  const lower = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let idx = lower.indexOf(lowerQuery);

  while (idx !== -1) {
    if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));
    parts.push(
      <mark key={idx} style={{ backgroundColor: '#FF5F2F1A', color: '#FF5F2F' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
    );
    lastIndex = idx + query.length;
    idx = lower.indexOf(lowerQuery, lastIndex);
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

export default function LetterCardDefault({
  letterId,
  content,
  isLiked,
  receivedAt,
  from,
  searchQuery,
  mode = 'view',
  selected = false,
  onSelectToggle,
  onLikeToggle,
}: LetterCardDefaultProps) {
  const [liked, setLiked] = useState(isLiked);
  const [isTwoLine, setIsTwoLine] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const toggleLike = useToggleLetterLike(letterId);

  const displayContent = searchQuery ? getContextSnippet(content, searchQuery) : content;

  useEffect(() => {
    if (!textRef.current) return;
    const lineHeight = 20;
    setIsTwoLine(textRef.current.scrollHeight > lineHeight + 1);
  }, [displayContent]);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const onClickLike = () => {
    const next = !liked;
    setLiked(next);
    onLikeToggle?.(next);
    toggleLike.mutate(next, {
      onError: () => {
        setLiked((cur) => !cur);
        onLikeToggle?.(!next);
      },
    });
  };

  const bgColor = safeColor(from?.bgColor, '#EDEDED');
  const fontColor = safeColor(from?.fontColor, '#555557');

  const fromName = from?.name ?? '-';
  const formatDate = (value: string) => {
    const match = value.match(/^\d{4}-\d{2}-\d{2}/);
    if (!match) return value;
    return match[0].slice(2).replace(/-/g, '.');
  };
  const displayDate =
    receivedAt && receivedAt.trim().length > 0 ? formatDate(receivedAt.trim()) : '-';

  return (
    <div className="w-full shadow-[0_0_4px_0_rgba(217,217,217,0.5)] rounded-lg">
      <div
        className={`rounded-lg bg-white px-4 py-[10px] ${isTwoLine ? 'h-[121px]' : 'h-[100px]'} flex flex-col`}
      >
        <div className="flex justify-between">
          <div className="mt-1 flex justify-start">
            <FromBadge name={fromName} bgColor={bgColor} fontColor={fontColor} size="md" />
          </div>
          {mode === 'select' ? (
            <button
              type="button"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onSelectToggle?.();
              }}
              className="w-[20px] h-[20px] cursor-pointer"
            >
              <img
                src={selected ? selectFilled : selectOutline}
                alt={selected ? 'selected' : 'unselected'}
                className="w-[20px] h-[20px]"
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onClickLike();
              }}
              disabled={toggleLike.isPending}
              className="cursor-pointer disabled:opacity-50"
            >
              {liked ? (
                <img src={heartFill} className="w-4 h-[14px]" />
              ) : (
                <img src={heartOuline} className="w-4 h-[14px]" />
              )}
            </button>
          )}
        </div>

        <div className="flex-1 flex items-center">
          <p
            ref={textRef}
            className="mx-auto w-full font-medium text-[14px] leading-[20px] tracking-[-0.01em] line-clamp-2 break-all text-[#555557]"
          >
            <HighlightText text={displayContent} query={searchQuery ?? ''} />
          </p>
        </div>
        <div className="text-[#C2C4C7] font-medium text-[12px]">{displayDate}</div>
      </div>
    </div>
  );
}