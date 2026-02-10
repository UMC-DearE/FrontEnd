// 프롬 뱃지 - 처음에 생성할 때만 textColor 넘기고 UI에서 사용할 때는 서버 응답으로 받아서 사용

interface FromBadgeProps {
  name: string;
  bgColor: string;
  fontColor: string;
  size?: 'sm' | 'md';
}

export function FromBadge({
  name,
  bgColor,
  fontColor,
  size = 'md',
}: FromBadgeProps) {
  const outerClass = size === 'sm' ? 'inline-flex h-[20px] px-[8px] rounded-[6px]' : 'inline-flex h-[24px] px-[11px] rounded-[6px]';
  const textClass = size === 'sm' ? 'flex items-center text-[12px] font-medium' : 'flex items-center text-[14px] font-medium';

  return (
    <span data-from-badge className={outerClass} style={{ backgroundColor: bgColor }}>
      <span data-from-badge-text className={textClass} style={{ color: fontColor }}>
        {name}
      </span>
    </span>
  );
}