interface FromBadgeProps {
  name: string;
  backgroundColor: string;
  textColor: string;
}

export function FromBadge({
  name,
  backgroundColor,
  textColor,
}: FromBadgeProps) {
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