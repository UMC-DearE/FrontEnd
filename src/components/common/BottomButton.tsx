import type { ReactNode } from 'react';

interface BottomButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'black';
  fontWeight?: 'medium' | 'semibold' | 'bold';
}

export function BottomButton({
  disabled = false,
  onClick,
  children,
  variant = 'primary',
  fontWeight = 'bold',
}: BottomButtonProps) {
  const enabledClass =
    variant === 'black'
      ? 'bg-primary cursor-pointer'
      : 'bg-[#FF5F2F] cursor-pointer shadow-[0px_4px_10px_rgba(255,79,24,0.2)]';

  const fontWeightClass = {
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }[fontWeight];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        h-[50px] w-full max-w-[440px] rounded-xl
        text-base text-white transition-all
        ${fontWeightClass}
        ${disabled ? 'bg-[#E7E8EB]' : enabledClass}
      `}
    >
      {children}
    </button>
  );
}
