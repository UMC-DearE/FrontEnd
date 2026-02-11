type AddLetterPillVariant = "dark" | "orange";

interface AddLetterPillProps {
  variant?: AddLetterPillVariant;
  className?: string;
}

function PlusIcon({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AddLetterPill({
  variant = "dark",
  className = "",
}: AddLetterPillProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={[
        "inline-flex items-center gap-[6px] rounded-full px-[13px] py-[10px]",
        "shadow-[0_6px_14px_rgba(0,0,0,0.12)]",
        isDark ? "bg-black" : "bg-[#FF5F2F]",
        "text-white",
        className,
      ].join(" ")}
    >
      <PlusIcon color={isDark ? "#FF5F2F" : "#FFFFFF"} />
      <span className="text-[14px] font-medium leading-none">편지 추가</span>
    </div>
  );
}
