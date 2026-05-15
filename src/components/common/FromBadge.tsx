// 프롬 뱃지 - 처음에 생성할 때만 textColor 넘기고 UI에서 사용할 때는 서버 응답으로 받아서 사용

interface FromBadgeProps {
  name: string;
  bgColor: string;
  fontColor: string;
  size?: 'md' | 'lg' | 'xl';
}

export function FromBadge({
  name,
  bgColor,
  fontColor,
  size = 'md',
}: FromBadgeProps) {
  const sizeClass = {
    md: {
      outer: 'inline-flex px-[12px] py-[5px] rounded-[6px]',
      text: 'flex items-center text-[13px] font-semibold',
    },
    lg: {
      outer: 'inline-flex px-[14px] py-[6px] rounded-[6px]',
      text: 'flex items-center text-[14px] font-semibold',
    },
    xl: {
      outer: 'inline-flex items-center px-[14px] py-[6px] rounded-[6px]',
      text: 'text-[16px] leading-[19px] font-semibold',
    },
  };

  return (
    <span
      data-from-badge
      className={sizeClass[size].outer}
      style={{ backgroundColor: bgColor }}
    >
      <span
        data-from-badge-text
        className={sizeClass[size].text}
        style={{ color: fontColor }}
      >
        {name}
      </span>
    </span>
  );
}
