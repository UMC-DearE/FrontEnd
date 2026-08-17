import type { ReactNode } from 'react';

import ChevronRightIcon from '@/components/icons/ChevronRightIcon';

export interface MyMenuItemProps {
  label: string;
  onClick?: () => void;
  dividerClassName?: string;
  rightText?: string;
  rightIcon?: ReactNode;
}

const DEFAULT_DIVIDER = 'border-b border-[#EBEDF0]';

export default function MyMenuItem({
  label,
  onClick,
  dividerClassName = DEFAULT_DIVIDER,
  rightText,
  rightIcon,
}: MyMenuItemProps) {
  return (
    <button type="button" onClick={onClick} className="w-full px-[22px] text-left">
      <div className={`py-[24px] flex justify-between items-center ${dividerClassName}`}>
        <span className="font-semibold text-[15px]">{label}</span>

        <div className="flex items-center gap-2">
          {rightText && <span className="text-sm text-gray-400">{rightText}</span>}
          {rightIcon ?? <ChevronRightIcon />}
        </div>
      </div>
    </button>
  );
}