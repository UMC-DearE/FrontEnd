// 편지함 편지 카드 간편 보기

import roundIcon from '@/assets/letterPage/roundIcon.svg';

type LetterCardCompactProps = {
  content: string;
  fromName: string;
};

export default function LetterCardCompact({ content, fromName }: LetterCardCompactProps) {
  return (
    <div className="w-full h-[46px] rounded-lg bg-white px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-[12px] flex-1 min-w-0">
        <img src={roundIcon} alt="round-icon" />
        <p className="text-[14px] font-medium text-[#555557] truncate">{content}</p>
      </div>

      <div className="flex h-5 w-[45px] min-w-0 items-center justify-center rounded-[6px]">
        <p className="text-[12px] text-[#9D9D9F] truncate w-full text-center">{fromName}</p>
      </div>
    </div>
  );
}
