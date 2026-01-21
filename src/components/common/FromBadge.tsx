import { getHarmoniousTextColor } from "@/utils/color";

interface FromBadgeProps {
  name: string;
  backgroundColor?: string;
}

export function FromBadge({
  name,
  backgroundColor = "#FFFFFF",
}: FromBadgeProps) {
  const textColor = getHarmoniousTextColor(backgroundColor);

  return (
    <span
      style={{
        backgroundColor,
        color: textColor,
      }}
      className="
        inline-flex items-center justify-center
        h-[24px]
        px-[11px] py-[4px]
        rounded-[6px]
        text-[14px] font-medium
      "
    >
      {name}
    </span>
  );
}