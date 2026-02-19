import LetterCardDefault from './LetterCardDefault';
import LetterCardCompact from './LetterCardCompact';
import type { From } from '@/types/from';

export type ViewMode = '기본 보기' | '간편 보기';

export type LetterCardProps = {
  letterId: number;
  excerpt: string;
  isLiked: boolean;
  receivedAt: string;
  from: From | null;
  viewMode: ViewMode;
  searchQuery?: string;
};

export default function LetterCard({
  letterId,
  viewMode,
  excerpt,
  isLiked,
  receivedAt,
  from,
  searchQuery,
}: LetterCardProps) {
  if (viewMode === '간편 보기') {
    return (
      <LetterCardCompact
        content={excerpt}
        fromName={from?.name ?? ''}
        searchQuery={searchQuery}
        bgColor={from?.bgColor}
      />
    );
  }

  return (
    <LetterCardDefault
      letterId={letterId}
      content={excerpt}
      isLiked={isLiked}
      receivedAt={receivedAt}
      from={from}
      searchQuery={searchQuery}
    />
  );
}
