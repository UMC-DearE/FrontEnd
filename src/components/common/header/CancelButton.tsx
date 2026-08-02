import { useNavigate } from 'react-router-dom';
import type { MouseEvent, MouseEventHandler } from 'react';

export default function CancelButton({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const navigate = useNavigate();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (onClick) return onClick(e);
    navigate(-1);
  }

  return (
    <button
      onClick={handleClick}
      className="text-base font-normal text-[#585A5F]"
      aria-label="취소"
    >
      취소
    </button>
  );
}
