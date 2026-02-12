import type React from "react";

export type HeartFilledIconProps = React.SVGProps<SVGSVGElement>;

export default function HeartFilledIcon(props: HeartFilledIconProps) {
  return (
    <svg
      width="14"
      height="13"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.09961 2.8501C7.09961 2.8501 7.14886 3.07347 6.55072 2.1001C5.91517 1.2301 4.97628 0.600098 3.84961 0.600098C2.05128 0.600098 0.599609 2.1076 0.599609 3.9751C0.599609 4.6726 0.801832 5.3176 1.1485 5.8501C1.7335 6.7576 7.09961 12.6001 7.09961 12.6001M7.09961 2.8501C7.09961 2.8501 7.09961 2.8501 7.6485 2.1001C8.28405 1.2301 9.22294 0.600098 10.3496 0.600098C12.1479 0.600098 13.5996 2.1076 13.5996 3.9751C13.5996 4.6726 13.3974 5.3176 13.0507 5.8501C12.4657 6.7576 7.09961 12.6001 7.09961 12.6001"
        fill="#FF5F2F"
        stroke="#FF5F2F"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
