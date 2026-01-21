import type { ReactNode } from "react";

interface BottomButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export function BottomButton({
  disabled = false,
  onClick,
  children,
}: BottomButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        w-[361px] h-[50px] rounded-xl font-bold text-base text-white
        transition-all
        ${
          disabled
            ? "bg-[#E6E7E9]"
            : "bg-[#FF5F2F] cursor-pointer shadow-[0px_4px_10px_rgba(255,79,24,0.2)]"
        }
      `}
    >
      {children}
    </button>
  );
}


