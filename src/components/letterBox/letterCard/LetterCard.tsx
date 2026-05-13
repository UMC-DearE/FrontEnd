import LetterCardDefault, { type LetterCardMode } from './LetterCardDefault';
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
  mode?: LetterCardMode;
  selected?: boolean;
  onSelectToggle?: () => void;
};

export default function LetterCard({
  letterId,
  viewMode,
  excerpt,
  isLiked,
  receivedAt,
  from,
  searchQuery,
  mode,
  selected,
  onSelectToggle,
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
      mode={mode}
      selected={selected}
      onSelectToggle={onSelectToggle}
    />
  );
}
