import type { EmotionCategory } from "@/types/letter";

interface EmotionTagProps {
  label?: string;
  category?: EmotionCategory;
  variant?: "gratitude" | "joy" | "comfort" | "longing" | "worry";
}

const LEGACY_STYLE = {
  gratitude: "bg-[#FFE0D8] text-[#F57542]",
  joy: "bg-[#FFF0BA] text-[#FFB245]",
  comfort: "bg-[#E6FECB] text-[#62BA65]",
  longing: "bg-[#F5E0F9] text-[#D572B7]",
  worry: "bg-[#D7E2F9] text-[#6B80B5]",
} as const;

 /* 없으면 legacy `variant` 스타일을 사용 */
export function EmotionTag({ label, category, variant }: EmotionTagProps) {
  const displayLabel = label ?? category?.type ?? "";

  const style = category
    ? { backgroundColor: category.bgColor, color: category.fontColor }
    : undefined;

  const legacyClass = variant ? LEGACY_STYLE[variant] : undefined;

  return (
    <span
      className={`inline-flex items-center justify-center h-[26px] px-[11px] py-[5px] rounded-[13px] text-[13px] font-medium ${
        legacyClass ?? ""
      }`}
      style={style}
      role="status"
    >
      {displayLabel}
    </span>
  );
}
