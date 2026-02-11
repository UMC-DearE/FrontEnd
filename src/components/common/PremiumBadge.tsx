interface PremiumBadgeProps {
  label?: string;
  className?: string;
}

export function PremiumBadge({ label = "UPGRADE", className = "", }: PremiumBadgeProps) {
  return (
    <span
      className={[
        `
        inline-flex items-center justify-center
        h-[18px]
        px-[7px] py-[3px]
        rounded-[4px]
        text-[12px] font-semibold text-white
        bg-gradient-to-r from-[#5B53F1] to-[#FB49A6]
        `,
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

