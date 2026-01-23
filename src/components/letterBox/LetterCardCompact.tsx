import roundIcon from '@/assets/letterPage/roundIcon.svg';

type LetterCardCompactProps = {
  content: string;
  fromName: string;
};

export default function LetterCardCompact({ content, fromName }: LetterCardCompactProps) {
  return (
    <div className="w-[361px] h-[46px] rounded-lg bg-white px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-[12px] flex-1">
        <img src={roundIcon} alt="round-icon" />
        <p className="text-[14px] font-medium text-[#555557] line-clamp-1">{content}</p>
      </div>

      <div className="flex h-5 w-[45px] items-center justify-center rounded-[6px]">
        <p className="text-[12px] text-[#9D9D9F] truncate">{fromName}</p>
      </div>
    </div>
  );
}
