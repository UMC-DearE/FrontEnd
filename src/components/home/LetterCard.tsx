import pinOffIcon from '@/assets/homePage/pin-outline.svg';
import pinOnIcon from '@/assets/homePage/pin-filled.svg';

export interface Letter {
  id: number;
  content: string;
  month: string;
  day: number;
  dayOfWeek: string;
}

interface LetterCardProps {
  letter: Letter | null;
  isPinned: boolean;
  onPin: (letterId: number) => void;
  onRequestUnpin: (letterId: number) => void;
}

export default function LetterCard({ letter, isPinned, onPin, onRequestUnpin }: LetterCardProps) {
  const isEmpty = !letter;
  const letterId = letter?.id;

  const handlePinClick = () => {
    if (!letterId) return;

    if (isPinned) {
      onRequestUnpin(letterId);
      return;
    }

    onPin(letterId);
  };

  return (
    <div className="relative mt-[20px] flex h-[97px] w-[361px] items-center rounded-[16px] bg-white shadow-[0_0_4px_0_rgba(217,217,217,0.5)]">
      <div className="mx-[12px] flex h-[57px] w-[47px] flex-col items-center justify-center rounded-[16px] bg-[#FF4F181A]">
        <span className="text-[10px] font-medium text-[#FF5F2F]">{letter?.month ?? ''}</span>
        <span className="text-[15px] font-bold text-[#FF5F2F]">{letter?.day ?? ''}</span>
        <span className="text-[11px] font-medium text-[#FF5F2F]">{letter?.dayOfWeek ?? ''}</span>
      </div>

      <div className="absolute left-[67px] top-[31px] h-[40px] w-[273px] text-[12.3px] leading-[20px]">
        {isEmpty ? (
          <p className="break-keep text-[#9D9D9F]">
            아직 추가한 편지가 없어요.
            <br />
            하단 <span className="font-bold text-[#FF5F2F]">편지 추가</span> 버튼을 눌러 첫 번째
            편지를 추가해 보세요
          </p>
        ) : (
          <p className="break-all font-medium text-[#555557]">{letter.content}</p>
        )}
      </div>

      <button
        type="button"
        onClick={handlePinClick}
        disabled={!letterId}
        className="absolute top-[8px] left-[339px] cursor-pointer"
      >
        <img
          src={isPinned ? pinOnIcon : pinOffIcon}
          alt="pin"
          className="h-[12.41px] w-[12.41px]"
        />
      </button>
    </div>
  );
}
