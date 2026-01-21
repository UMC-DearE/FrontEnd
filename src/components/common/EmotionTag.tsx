interface EmotionTagProps {
  label: string;
  emotion: "gratitude" | "joy" | "comfort" | "longing" | "worry";
}

const EMOTION_STYLE = {
  gratitude: "bg-[#FFE0D8] text-[#F57542]", // 고마움
  joy: "bg-[#FFF0BA] text-[#FFB245]",       // 즐거움
  comfort: "bg-[#E6FECB] text-[#62BA65]",   // 위로
  longing: "bg-[#F5E0F9] text-[#D572B7]",   // 그리움
  worry: "bg-[#D7E2F9] text-[#6B80B5]",     // 고민
} as const;


export function EmotionTag({ label, emotion }: EmotionTagProps) {
  return (
    <span
      className={`
        inline-flex items-center justify-center
        h-[26px]
        px-[11px] py-[5px]
        rounded-[13px]
        text-[13px] font-medium
        ${EMOTION_STYLE[emotion]}
      `}
    >
      {label}
    </span>
  );
}
