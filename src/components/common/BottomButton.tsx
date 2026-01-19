interface BottomButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function BottomButton({
  disabled = false,
  onClick,
  children,
}: BottomButtonProps) {
  const boxShadow = disabled ? undefined : "0px 4px 10px rgba(255,79,24,0.2)";

  return (
    <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    style={{ boxShadow }}
    className={`
      w-[361px] h-[50px] rounded-xl font-bold text-white transition-colors text-base
      ${disabled ? "bg-[#E6E7E9] text-white" : "bg-[#FF5F2F] text-white cursor-pointer"}
    `}
  >
    {children}
  </button>
);
}

