import { PremiumBadge } from "@/components/common/PremiumBadge";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";

export interface MyMenuItemProps {
  label: string;
  plusOnly?: boolean;
  onClick?: () => void;
  dividerClassName?: string;
  rightText?: string;
}

const DEFAULT_DIVIDER = "border-b border-[#E6E7E9]";

export default function MyMenuItem({
  label,
  plusOnly,
  onClick,
  dividerClassName = DEFAULT_DIVIDER,
  rightText,
}: MyMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-[22px] py-[18px] flex justify-between items-center ${dividerClassName}`}
    >
      <span className="font-medium text-[16px]">{label}</span>

      <div className="flex items-center gap-2">
        {rightText ? (
          <span className="text-sm text-gray-400">{rightText}</span>
        ) : plusOnly ? (
          <PremiumBadge label="Plus" />
        ) : null}

        <ChevronRightIcon />
      </div>
    </button>
  );
}
