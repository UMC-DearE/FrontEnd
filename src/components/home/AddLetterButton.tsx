import plusIcon from '../../assets/homePage/plusIcon.svg';

interface AddLetterButtonProps {
  onClick?: () => void;
}

export default function AddLetterButton({ onClick }: AddLetterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-[6px] rounded-[17px] bg-black px-[12px] py-[9px]"
    >
      <img src={plusIcon} alt="편지 추가" className="h-[11px] w-[11px]" />
      <span className="w-[52px] h-[17px] text-[14px] font-medium text-white">편지 추가</span>
    </button>
  );
}
