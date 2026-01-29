// 프롬 뱃지 - 처음에 생성할 때만 textColor 넘기고 UI에서 사용할 때는 서버 응답으로 받아서 사용

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