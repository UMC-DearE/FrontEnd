// 편지함 편지 카드 간편 보기

type LetterCardCompactProps = {
  content: string;
  fromName: string;
  bgColor?: string;
  searchQuery?: string;
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

export default function LetterCardCompact({
  content,
  fromName,
  bgColor,
  searchQuery,
}: LetterCardCompactProps) {
  const displayText = searchQuery ? getContextSnippet(content, searchQuery) : content;

  return (
    <div className="w-full h-[46px] rounded-lg bg-white px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-[12px] flex-1 min-w-0">
        <div
          className="w-[14px] h-[14px] rounded-full flex-shrink-0"
          style={{ backgroundColor: bgColor }}
        />
        <p className="text-[14px] font-medium text-[#555557] truncate">
          <HighlightText text={displayText} query={searchQuery ?? ''} />
        </p>
      </div>

      <div className="flex h-5 w-[45px] min-w-0 items-center justify-center rounded-[6px]">
        <p className="text-[12px] text-[#9D9D9F] truncate w-full text-center">{fromName}</p>
      </div>
    </div>
  );
}
