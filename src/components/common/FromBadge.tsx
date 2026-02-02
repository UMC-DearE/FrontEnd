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
      data-from-badge
      className="inline-flex h-[24px] px-[11px] rounded-[6px]"
      style={{ backgroundColor }}
    >
      <span
        data-from-badge-text
        className="flex items-center text-[14px] font-medium"
        style={{ color: textColor }}
      >
        {name}
      </span>
    </span>
  );
}