// 편지함 편지 카드 뷰 모드 설정

import LetterCardDefault from './LetterCardDefault';
import LetterCardCompact from './LetterCardCompact';

export type ViewMode = '기본 보기' | '간편 보기' | '앨범 보기';

export type LetterCardProps = {
  content: string;
  isLiked: boolean;
  receiveAt: string;
  fromName: string;
  fromBgColor: string;
  fromFontColor: string;
  viewMode: ViewMode;
};

export default function LetterCard({
  viewMode,
  content,
  isLiked,
  receiveAt,
  fromName,
  fromBgColor,
  fromFontColor,
}: LetterCardProps) {
  if (viewMode === '간편 보기') {
    return <LetterCardCompact content={content} fromName={fromName} />;
  }

  return (
    <LetterCardDefault
      content={content}
      isLiked={isLiked}
      receiveAt={receiveAt}
      fromName={fromName}
      fromBgColor={fromBgColor}
      fromFontColor={fromFontColor}
    />
  );
}
