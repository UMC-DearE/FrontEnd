interface ReportHashtagsProps {
  hashtags: string[];
}

export default function ReportHashtags({ hashtags }: ReportHashtagsProps) {
  if (hashtags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {hashtags.map((hashtag) => (
        <span
          key={hashtag}
          className="rounded-[13px] bg-[#FFEEE8] px-[11px] py-[6px] text-[13px] font-medium text-[#FF5F2F]"
        >
          #{hashtag}
        </span>
      ))}
    </div>
  );
}
