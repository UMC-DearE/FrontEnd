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
      className="flex h-[38px] w-[103px] items-start rounded-full bg-black shadow-[0_0_4px_0.5px_rgba(0,0,0,0.15)] cursor-pointer"
    >
      <div className="ml-[13px] mt-[7px] flex h-6 w-[84px] items-center gap-2">
        <p className="text-[14px] font-semibold leading-none text-white whitespace-nowrap">
          편지 추가
        </p>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <img src={plusIcon} alt="편지 추가" className="h-3 w-3" />
        </div>
      </div>
    </button>
  );
}
