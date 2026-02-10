import LetterCardDefault from './LetterCardDefault';
import LetterCardCompact from './LetterCardCompact';
import type { LetterFrom } from '@/types/letter';

export type ViewMode = '기본 보기' | '간편 보기';

export type LetterCardProps = {
  letterId: number;
  excerpt: string;
  isLiked: boolean;
  receivedAt: string;
  from: LetterFrom;
  viewMode: ViewMode;
};

export default function LetterCard({
  letterId,
  viewMode,
  excerpt,
  isLiked,
  receivedAt,
  from,
}: LetterCardProps) {
  if (viewMode === '간편 보기') {
    return <LetterCardCompact content={excerpt} fromName={from.name} />;
  }

  return (
    <LetterCardDefault
      letterId={letterId}
      content={excerpt}
      isLiked={isLiked}
      receivedAt={receivedAt}
      fromName={from.name}
      fromBgColor={from.bgColor}
      fromFontColor={from.fontColor}
    />
  );
}
