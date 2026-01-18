import { useNavigate } from "react-router-dom";
import type { MouseEventHandler } from "react";

export default function CancelButton({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
  const navigate = useNavigate();

  function handleClick(e: any) {
    if (onClick) return onClick(e);
    navigate(-1);
  }

  return (
    <button onClick={handleClick} className="text-base font-regular text-[#555557]" aria-label="취소">
      취소
    </button>
  );
}
