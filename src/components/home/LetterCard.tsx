// 홈 편지 카드

import pinOffIcon from '@/assets/homePage/pin-outline.svg';
import pinOnIcon from '@/assets/homePage/pin-filled.svg';

export type HomeCardLetter = {
  id: number;
  excerpt: string;
  month: string;
  day: number;
  dayOfWeek: string;
};

interface LetterCardProps {
  letter: HomeCardLetter | null;
  isPinned: boolean;
  onPin: (letterId: number) => void;
  onRequestUnpin: (letterId: number) => void;
}

export default function LetterCard({ letter, isPinned, onPin, onRequestUnpin }: LetterCardProps) {
  const isEmpty = !letter || !letter.excerpt;
  const letterId = letter?.id ?? null;

  const handlePinClick = () => {
    if (letterId == null || isEmpty) return;
    if (isPinned) {
      onRequestUnpin(letterId);
      return;
    }
    onPin(letterId);
  };

  return (
    <div className="relative mt-5 flex w-full min-w-[320px] max-w-[440px] min-h-[97px] items-center rounded-[10px] bg-white shadow-[0_0_4px_0_rgba(217,217,217,0.5)]">
      {/* 날짜 뱃지 */}
      <div className="mx-3 flex h-[57px] w-[47px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-[#FF4F181A]">
        <p className="text-[10px] font-medium text-[#FF5F2F]">{letter?.month ?? ''}</p>
        <p className="text-[15px] font-bold text-[#FF5F2F]">{letter?.day ?? ''}</p>
        <p className="text-[11px] font-medium text-[#FF5F2F]">{letter?.dayOfWeek ?? ''}</p>
      </div>

      {/* 편지 내용 */}
      <div className="flex-1 pr-8 py-4 text-[12.3px] leading-[20px]">
        {isEmpty ? (
          <p className="break-keep text-[#A1A4AA]">
            아직 추가한 편지가 없어요.
            <br />
            하단 편지 추가 버튼을 눌러 편지를 추가해 보세요!
          </p>
        ) : (
          <p className="line-clamp-2 break-all font-medium text-[#555557]">{letter.excerpt}</p>
        )}
      </div>

      {/* 핀 버튼 */}
      <button
        type="button"
        onClick={handlePinClick}
        disabled={letterId == null || isEmpty}
        className="absolute top-2 right-3 cursor-pointer"
      >
        <img src={isPinned ? pinOnIcon : pinOffIcon} alt="pin" className="h-[14px] w-[14px]" />
      </button>
    </div>
  );
}
