import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string; // 필요하면 추가 커스터마이징
}

export function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        w-[122px] h-[38px]
        rounded-lg
        text-[14px] font-medium
        transition-colors
        ${
          disabled
            ? "bg-[#DCDCDCCC] text-[#9D9D9F]"
            : "bg-primary text-white"
        }
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

