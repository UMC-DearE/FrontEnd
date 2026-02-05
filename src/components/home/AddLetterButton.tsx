// 홈 편지 추가 버튼

import { useNavigate } from 'react-router-dom';
import plusIcon from '@/assets/homePage/plusIcon.svg';

interface AddLetterButtonProps {
  onClick?: () => void;
}

export default function AddLetterButton({ onClick }: AddLetterButtonProps) {
  const navigate = useNavigate();

  function handleClick() {
    if (onClick) return onClick();
    navigate('/create');
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-[6px] rounded-[17px] bg-black px-3 py-[9px] cursor-pointer"
    >
      <img src={plusIcon} alt="편지 추가" className="h-[11px] w-[11px]" />
      <span className="w-[52px] h-[17px] text-[14px] font-medium text-white">편지 추가</span>
    </button>
  );
}
